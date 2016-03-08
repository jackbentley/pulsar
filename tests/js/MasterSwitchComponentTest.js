'use strict';

var $ = require('jquery'),
	MasterSwitchComponent = require('../../js/MasterSwitchComponent');

describe('MasterSwitch component', function() {

	beforeEach(function() {
		this.$html = $('<html></html>');
		this.$body = $('<body></body>').appendTo(this.$html);
		this.$markup = $('\
<div class="masterswitch">\
	<div class="form__group masterswitch-control">\
		<label for="toggletest" class="control__label">toggle</label>\
		<div class="controls">\
			<input label="Enable masterswitch content" id="toggletest" type="checkbox" class="form__control toggle-switch">\
			<label for="toggletest" class="control__label toggle-switch-label">\
				<span class="hide">Enable masterswitch content</span>\
			</label>\
		</div>\
	</div>\
	<section class="masterswitch-content is-disabled">\
		<a href="#">foo</a>\
		<button>foo</button>\
		<input type="text" />\
		<select><option>foo</option></select>\
	</section>\
</div>\
').appendTo(this.$html);

		this.$control = this.$html.find('.masterswitch-control .form__control');
		this.$content = this.$html.find('.masterswitch-content');
		this.$contentLink = this.$html.find('.masterswitch-content a');
		this.$contentButton = this.$html.find('.masterswitch-content button');
		this.$contentInput = this.$html.find('.masterswitch-content input');
		this.$contentSelect = this.$html.find('.masterswitch-content select');

		this.masterSwitch = new MasterSwitchComponent(this.$html);

	});

	describe('the default state of the masterswitch markup', function() {

		beforeEach(function() {
			this.masterSwitch.init();
		});

		it('should have an unchecked control', function() {
			expect(this.$control.prop('checked')).to.be.false;
		});

		it('should have a disabled content container', function() {
			expect(this.$content.hasClass('is-disabled')).to.be.true;
		});

		it('should prevent any links from being clicked', function() {
			var clickEvent = $.Event('click');

			this.$contentLink.trigger(clickEvent);

			expect(clickEvent.isDefaultPrevented()).to.be.true;
		});

		it('should add the disabled attribute to buttons', function() {
			expect(this.$contentButton.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to inputs', function() {
			expect(this.$contentInput.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to selects', function() {
			expect(this.$contentSelect.attr('disabled')).to.equal('disabled');
		});

	});

	describe('checking the control', function() {

		beforeEach(function() {
			this.masterSwitch.init();
			this.$control.click();
		});

		it('should enable the content container', function() {
			expect(this.$html.find('.masterswitch-content').hasClass('is-disabled')).to.be.false;
		});

		it('should allow any links to be clicked', function() {
			var clickEvent = $.Event('click');

			this.$contentLink.trigger(clickEvent);

			expect(clickEvent.isDefaultPrevented()).to.be.false;
		});

		it('should remove the disabled attribute from buttons', function() {
			expect(this.$contentButton.attr('disabled')).to.be.undefined;
		});

		it('should remove the disabled attribute from inputs', function() {
			expect(this.$contentInput.attr('disabled')).to.be.undefined;
		});

		it('should remove the disabled attribute from selects', function() {
			expect(this.$contentSelect.attr('disabled')).to.be.undefined;
		});

	});

	describe('unchecking the control', function() {

		beforeEach(function() {
			this.masterSwitch.init();
			this.$control.click();
			this.$control.click();
		});

		it('should disable the content container', function() {
			expect(this.$html.find('.masterswitch-content').hasClass('is-disabled')).to.be.true;
		});

		it('should add the disabled attribute to buttons', function() {
			expect(this.$contentButton.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to inputs', function() {
			expect(this.$contentInput.attr('disabled')).to.equal('disabled');
		});

		it('should add the disabled attribute to selects', function() {
			expect(this.$contentSelect.attr('disabled')).to.equal('disabled');
		});

	});

});
