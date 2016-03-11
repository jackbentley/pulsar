global._ = require('lodash');
global.fs = require('fs');
global.util = require('util');
global.path = require('path');
global.assert = require('chai').assert;
global.expect = require('chai').expect;
global.sinon = require('sinon');
global.moment = require('moment');
var Asserter = require('./Asserter');
var KeyValuePair = require('phpruntime/node_modules/phpcore/src/KeyValuePair');
var ArrayValue = require('phpruntime/node_modules/phpcore/src/Value/Array').sync();
var ObjectValue = require('phpruntime/node_modules/phpcore/src/Value/Object').sync();
var ClassClass = require('phpruntime/node_modules/phpcore/src/Class').sync();

var phpParser = require('phptoast').create(),
    phpToJS = require('phptojs'),
    phpRuntime = require('phpruntime/sync'); // Require the sync entrypoint so you can actually read the stack trace

ArrayValue.prototype.getNative = function () {
    var result = [];
    var hasNonNumericKey = false;

    _.each(this.value, function (element) {
        if (!_.isNumber(element.getKey().getNative())) {
            hasNonNumericKey = true;
        }
    });

    result = hasNonNumericKey ? {} : [];

    _.each(this.value, function (element) {
        result[element.getKey().getNative()] = element.getValue().getNative();
    });

    return result;
};

ClassClass.prototype.instantiate = function (args) {
    var classObject = this,
        nativeObject = Object.create(classObject.InternalClass.prototype),
        objectValue;

    classObject.InternalClass.apply(nativeObject, _.map(args, function (value) {
        return value.unwrapForJS();
    }));

    objectValue = classObject.valueFactory.createObject(nativeObject, classObject);

    classObject.construct(objectValue, args);

    return objectValue;
};

var oldCallMethod = ObjectValue.prototype.callMethod;
ObjectValue.prototype.callMethod = function (name, args) {
    var realMethodFunc,
        result;

    if (this.classObject.getName() !== 'UrlParamsExtension') {
        return oldCallMethod.call(this, name, args);
    }

    realMethodFunc = this.value[name];
    this.value[name] = function () {
        var thisObj = this.value,
            args = _.map(arguments, function (arg) {
                return arg.unwrapForJS();
            });

        return realMethodFunc.apply(thisObj, args);
    };
    result = oldCallMethod.call(this, name, args);
    this.value[name] = realMethodFunc; // Restore

    return result;
};

var timeNow = new Date('2016-01-01 12:00').getTime();

phpRuntime.install({
    functionGroups: [
        function (internals) {
            _.extend(internals.valueFactory, {
                createFromNative: function (nativeValue) {
                    var factory = this;

                    if (nativeValue === null || typeof nativeValue === 'undefined') {
                        return factory.createNull();
                    }

                    if (_.isString(nativeValue)) {
                        return factory.createString(nativeValue);
                    }

                    if (_.isNumber(nativeValue)) {
                        return factory.createInteger(nativeValue);
                    }

                    if (_.isBoolean(nativeValue)) {
                        return factory.createBoolean(nativeValue);
                    }

                    if (_.isArray(nativeValue)) {
                        return factory.createFromNativeArray(nativeValue);
                    }

                    // Handle plain objects -> associative arrays
                    if (Object.getPrototypeOf(nativeValue) === Object.prototype) {
                        return factory.createFromPlainObject(nativeValue);
                    }

                    return factory.createObject(nativeValue, factory.globalNamespace.getClass('JSObject'));
                },
                createFromPlainObject: function (plainObject) {
                    var factory = this,
                        orderedElements = [];

                    _.forOwn(plainObject, function (value, key) {
                        orderedElements.push(new KeyValuePair(factory.coerce(key), factory.coerce(value)));
                    });

                    return factory.createArray(orderedElements);
                }
            });

            return {
                'time': function () {
                    return internals.valueFactory.createInteger(timeNow/1000);
                },
                'date_default_timezone_set': function () {
                    return null;
                },
                'json_decode': function (json, assoc) {
                    var parsed = JSON.parse(json.getValue().unwrapForJS());

                    if (assoc) {
                        return internals.valueFactory.createFromNative(parsed);
                    }

                    return internals.valueFactory.createObject(parsed, internals.globalNamespace.getClass('JSObject'));
                }
            };
        }
    ],
    classes: {
        'DateTime': function (internals) {
            function DateTime(time) {
                switch (time) {
                    case 'now':
                    default:
                        this.time = moment();
                }
            }

            DateTime.prototype.setTimezone = function () {};

            internals.defineUnwrapper(function () {
                return this.time.toDate();
            });

            return DateTime;
        },
        'DateTimeZone': function () {
            function DateTimeZone() {}

            return DateTimeZone;
        },
        'Twig_Environment': function () {
            function Twig_Environment() {}

            return Twig_Environment;
        }
    }

});

function BaseTest() {
    this.testsPath = path.resolve(__dirname + '/../../../unit/Jadu/Pulsar/Twig/Extension/');
    this.injectionsPath = path.resolve(__dirname + '/../injections/');
    this.asserter = new Asserter(this);
}

BaseTest.prototype.loadPreInjections = function () {
    var preInjectionsPath = path.resolve(this.injectionsPath + '/pre/');
    var preInjections = fs.readdirSync(preInjectionsPath);

    var loadedPreInjections = {};
    _.each(preInjections, function (injection) {
        var preInjectionPath = path.resolve(preInjectionsPath + '/' + injection);
        loadedPreInjections[injection] = fs.readFileSync(preInjectionPath).toString();
    });

    this.preInjections = loadedPreInjections;
};

BaseTest.prototype.loadPostInjections = function () {
    var postInjectionsPath = path.resolve(this.injectionsPath + '/post/');
    var postInjections = fs.readdirSync(postInjectionsPath);

    var loadedPostInjections = {};
    _.each(postInjections, function (injection) {
        var postInjectionPath = path.resolve(postInjectionsPath + '/' + injection);
        loadedPostInjections[injection] = fs.readFileSync(postInjectionPath).toString();
    });

    this.postInjections = loadedPostInjections;
};

BaseTest.prototype.loadInjections = function () {
    this.loadPreInjections();
    this.loadPostInjections();
};

BaseTest.prototype.rewriteTest = function (test) {
    //Strip out the opening php tag
    test = test.replace(/^[\s]*\<\?php\n/, '');

    var preInjections = '';
    //Inject all pre injections
    _.each(this.preInjections, function (preInjection) {
        preInjections += preInjection;
    });

    test = preInjections + test;

    //Reattach the opening php tag
    test = '<?php\n' + test;

    //Inject all post injections
    _.each(this.postInjections, function (postInjection) {
        test += postInjection;
    });

    //Remove namespaces
    test = test.replace('namespace Jadu\\Pulsar\\Twig\\Extension;\n', '');

    return test;
};

BaseTest.prototype.calculateTestsToRun = function (test) {
    //Find tests to run by parsing the PHP file.
    //Uniter does not yet support class reflection.
    var testsToRun = [];
    var testNameRegex = /public function test([\S]*)\(\)/g;
    var testNames;
    while ((testNames = testNameRegex.exec(test)) !== null) {
        var testName = testNames[1];
        testsToRun.push('test' + testName);
    }

    this.testsToRun = testsToRun;
};

BaseTest.prototype.setTestName = function (testName) {
    this.nextTest = testName;
};

BaseTest.prototype.injectClass = function (name, jsClass) {
    var classes = {};
    classes[name] = function () {
        return jsClass;
    };

    phpRuntime.install({
        classes: classes
    });
};

BaseTest.prototype.run = function () {
    this.test = this.testName + '.php';

    var testInstance = this;

    this.loadInjections();

    var testPath = path.resolve(this.testsPath + '/' + this.test);
    var test = fs.readFileSync(testPath).toString();

    this.calculateTestsToRun(test);
    test = this.rewriteTest(test);

    var wrapper = new Function('return ' + phpToJS.transpile(phpParser.parse(test), {bare: true}) + ';')(),
        module = phpRuntime.compile(wrapper),
        engine = module();

    engine.getStdout().on('data', function (text) { console.log(text); });
    engine.getStderr().on('data', function (text) {
        console.error('Bang:');
        console.error(text);
    });

    engine.expose(this.extension, 'javascriptExtension');
    engine.expose(this.testName, 'testName');
    engine.expose(this.testsToRun, 'tests');
    engine.expose(this, 'nameSetter');
    engine.expose(this.asserter, 'asserter');

    sinon.useFakeTimers(timeNow);

    describe(this.testName, function () {
        engine.execute();
    });
};

module.exports = BaseTest;