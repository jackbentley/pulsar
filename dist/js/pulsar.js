/*!                                                                 
                          88                                     
                          88                                     
                          88                                     
8b,dPPYba,   88       88  88  ,adPPYba,  ,adPPYYba,  8b,dPPYba,  
88P'    "8a  88       88  88  I8[    ""  ""     `Y8  88P'   "Y8  
88       d8  88       88  88   `"Y8ba,   ,adPPPPP88  88          
88b,   ,a8"  "8a,   ,a88  88  aa    ]8I  88,    ,88  88          
88`YbbdP"'    `"YbbdP'Y8  88  `"YbbdP"'  `"8bbdP"Y8  88          
88                                                               
88                                                               

Don't edit this file directly!
Refer to the pulsar documentation for more information.

Built: Monday 30-09-2013 - 10:09:32 AM (GMT+0100)

*/
var hostname = "localhost" === location.hostname ? "none" : location.hostname, _gaq = _gaq || [];

_gaq.push([ "_setAccount", "UA-43788424-1" ]), _gaq.push([ "_setDomainName", hostname ]), 
_gaq.push([ "_setAllowLinker", !0 ]), _gaq.push([ "_trackPageview" ]), function() {
    var a = document.createElement("script");
    a.type = "text/javascript", a.async = !0, a.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
}(), !function(a) {
    "use strict";
    function b(b, c, d) {
        var e = "";
        return a.ajax({
            async: !1,
            data: d,
            url: a.fn.deck.defaults.deckPath + c,
            success: function(a) {
                e = a;
            }
        }), e;
    }
    function c(a, b) {
        a.html(b);
    }
    function d() {
        g.hide.call();
    }
    function e() {
        var b = a(this).parent();
        b.hide(), 0 === b.index() && g.hide.call(this, b.parent());
    }
    function f() {
        var b = a(a(this).attr("href")), c = b.parent().offset().top, d = b.offset().top;
        b.show();
        var e = b.css("left"), f = b.width(), g = b.offset().left, h = a(window).scrollTop(), i = a(a.fn.deck.defaults.viewportOffsetElement).height();
        b.css({
            left: b.offset().left,
            position: "fixed",
            top: i,
            width: f
        }), d > c && a(window).bind("mousewheel", function(d, f) {
            var j = f > 0 ? "up" : "down", k = a(window).scrollTop();
            "down" === j ? b.css({
                position: "relative",
                left: e,
                top: h - 50
            }) : h > k && (h = k, b.css({
                position: "fixed",
                left: g,
                top: i
            })), c >= k + i && (b.css({
                left: e,
                position: "absolute",
                top: 0
            }), a(window).unbind("mousewheel"));
        });
    }
    var g = {
        init: function(b) {
            a(".deck").on({
                click: d
            }, '[data-dismiss="deck"]'), a(".deck").on({
                click: f
            }, '[data-toggle="slide"]'), a(".deck").on({
                click: e
            }, '[data-dismiss="slide"]'), g.show.call(this, b);
        },
        show: function(d) {
            return this.each(function() {
                var e = a(this), f = e.attr("data-deck-source"), h = d.attr("data-params");
                if (g.hide.call(this), f) {
                    var i = b(e, f, h);
                    c(e, i);
                }
                if (a(a.fn.deck.defaults.backgroundElements).addClass(a.fn.deck.defaults.backgroundClassName), 
                !a("html").hasClass("ie7")) {
                    var j = a(a.fn.deck.defaults.backgroundElements).Vague({
                        intensity: 2
                    });
                    j.blur();
                }
                e.addClass(a.fn.deck.defaults.activeClassName).children().first().show();
            });
        },
        hide: function(b) {
            if (b ? b.removeClass(a.fn.deck.defaults.activeClassName).children().hide() : a(a.fn.deck.defaults.deckClass).removeClass(a.fn.deck.defaults.activeClassName).children().hide(), 
            a(a.fn.deck.defaults.backgroundElements).removeClass(a.fn.deck.defaults.backgroundClassName), 
            !a("html").hasClass("ie7")) {
                var c = a(a.fn.deck.defaults.backgroundElements).Vague({
                    intensity: 2
                });
                c.destroy();
            }
            return this;
        }
    };
    a.fn.deck = function(b) {
        return g[b] ? g[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.deck"), 
        void 0) : g.init.apply(this, arguments);
    }, a.fn.deck.defaults = {
        deckPath: "decks/",
        deckClass: ".deck",
        activeClassName: "active",
        backgroundClassName: "deck-background",
        backgroundElements: ".breadcrumb, .actionsbar, .heading, .tabs__list, .tabs__content, .summary",
        viewportOffsetElement: "header"
    }, a(function() {
        a("body").on("click.deck.data-api", '[data-toggle="deck"]', function(b) {
            b.preventDefault();
            var c = a(this), d = a(c).attr("href");
            a(d).deck(c);
        });
    });
}(jQuery), function(a) {
    function b(b) {
        var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, f = 0, g = 0;
        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), 
        c.detail && (e = -c.detail / 3), g = e, void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (g = 0, 
        f = -1 * e), void 0 !== c.wheelDeltaY && (g = c.wheelDeltaY / 120), void 0 !== c.wheelDeltaX && (f = -1 * c.wheelDeltaX / 120), 
        d.unshift(b, e, f, g), (a.event.dispatch || a.event.handle).apply(this, d);
    }
    var c = [ "DOMMouseScroll", "mousewheel" ];
    if (a.event.fixHooks) for (var d = c.length; d; ) a.event.fixHooks[c[--d]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) for (var a = c.length; a; ) this.addEventListener(c[--a], b, !1); else this.onmousewheel = b;
        },
        teardown: function() {
            if (this.removeEventListener) for (var a = c.length; a; ) this.removeEventListener(c[--a], b, !1); else this.onmousewheel = null;
        }
    }, a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a);
        }
    });
}(jQuery), +function(a) {
    "use strict";
    function b() {
        a(d).remove(), a(e).each(function(b) {
            var d = c(a(this));
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"));
        });
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                if ("ontouchstart" in document.documentElement && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), 
                f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return;
                f.toggleClass("open").trigger("shown.bs.dropdown");
            }
            return e.focus(), !1;
        }
    }, f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d), g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
                var h = a("[role=menu] li:not(.divider):visible a", f);
                if (h.length) {
                    var i = h.index(h.filter(":focus"));
                    38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), 
                    h.eq(i).focus();
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c);
        });
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g, this;
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown);
}(window.jQuery), $(document).ready(function() {
    "use strict";
    $(".flash.is-sticky").delay("1000").slideDown("100", function() {
        $(this).sticky({
            topSpacing: 44
        }).sticky("update");
    }), $('[data-dismiss="flash"]').on("click", function() {
        $(this).closest(".flash").parent().slideUp("100");
    });
}), +function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b).on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal__body").load(this.options.remote);
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, b.prototype.toggle = function() {
        return this[this.isShown ? "hide" : "show"]();
    }, b.prototype.show = function() {
        var b = this, c = a.Event("show.bs.modal");
        this.$element.trigger(c), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, 
        this.escape(), this.backdrop(function() {
            var c = a.support.transition && b.$element.hasClass("fade");
            b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), 
            c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), 
            b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function() {
                b.$element.focus().trigger("shown.bs.modal");
            }).emulateTransitionEnd(300) : b.$element.focus().trigger("shown.bs.modal");
        }));
    }, b.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), 
        this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
    }, b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus();
        }, this));
    }, b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }, b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal");
        });
    }, b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal__backdrop ' + c + '" />').appendTo(document.body), 
            this.$element.on("click", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
            }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b();
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b();
    };
    var c = a.fn.modal;
    a.fn.modal = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.modal"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            e || d.data("bs.modal", e = new b(this, f)), "string" == typeof c ? e[c]() : f.show && e.show();
        });
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
        return a.fn.modal = c, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({
            remote: !/#/.test(d) && d
        }, e.data(), c.data());
        b.preventDefault(), e.modal(f).one("hide", function() {
            c.is(":visible") && c.focus();
        });
    }), a(function() {
        var b = a(document.body).on("shown.bs.modal", ".modal", function() {
            b.addClass("modal--open");
        }).on("hidden.bs.modal", ".modal", function() {
            b.removeClass("modal--open");
        });
    });
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover__title"></h3><div class="popover__content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, 
    b.prototype.getDefaults = function() {
        return b.DEFAULTS;
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover__title")[this.options.html ? "html" : "text"](b), a.find(".popover__content")[this.options.html ? "html" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover__title:empty").hide();
    }, b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, b.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
            e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
        return a.fn.popover = c, this;
    }, a(document).ready(function() {
        a('[data-toggle="popover"]').popover();
    });
}(window.jQuery), $(document).ready(function() {
    $(".toolbar").sticky({
        topSpacing: 0
    }), $('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
        a.target, a.relatedTarget, $(".summary.open").removeClass("open").hide(), $(".summary[data-tab=" + $(a.target).attr("href") + "]").show().addClass("open");
    });
}), +function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b);
    };
    b.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("is-active")) {
            var e = c.find(".is-active:last a")[0], f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    });
                });
            }
        }
    }, b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("is-active").find("> .dropdown-menu > .is-active").removeClass("is-active"), 
            b.addClass("is-active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), 
            b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("is-active"), d && d();
        }
        var f = c.find("> .is-active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in");
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]();
        });
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
        return a.fn.tab = c, this;
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
        b.preventDefault(), a(this).tab("show");
    }), a(document).ready(function() {
        a(".tab__pane").css("min-height", a(".tabs__list").height());
    });
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
        this.init("tooltip", a, b);
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, b.prototype.getDefaults = function() {
        return b.DEFAULTS;
    }, b.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, b.prototype.enter = function(b) {
        var c = this.getDefaults(), d = {};
        this._options && a.each(this._options, function(a, b) {
            c[a] != b && (d[a] = b);
        });
        var e = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](d).data("bs." + this.type);
        return clearTimeout(e.timeout), e.options.delay && e.options.delay.show ? (e.hoverState = "in", 
        e.timeout = setTimeout(function() {
            "in" == e.hoverState && e.show();
        }, e.options.delay.show), void 0) : e.show();
    }, b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this._options).data("bs." + this.type);
        return clearTimeout(c.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", 
        c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide), void 0) : c.hide();
    }, b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) return;
            var c = this.tip();
            this.setContent(), this.options.animation && c.addClass("fade");
            var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d);
            f && (d = d.replace(e, "") || "top"), c.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
            var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
            if (f) {
                var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left;
                d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, 
                c.removeClass(k).addClass(d);
            }
            var p = this.getCalcuatedOffset(d, g, h, i);
            this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type);
        }
    }, b.prototype.applyPlacement = function(a, b) {
        var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, 
        d.offset(a).addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
            var k = 0;
            a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), 
            this.replaceArrow(k - e + i, i, "left");
        } else this.replaceArrow(j - f, j, "top");
        c && d.offset(a);
    }, b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, b.prototype.hide = function() {
        function b() {
            c.detach();
        }
        var c = this.tip(), d = a.Event("hide.bs." + this.type);
        return this.$element.trigger(d), d.isDefaultPrevented() ? void 0 : (c.removeClass("in"), 
        a.support.transition && this.$tip.hasClass("fade") ? c.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), 
        this.$element.trigger("hidden.bs." + this.type), this);
    }, b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, b.prototype.hasContent = function() {
        return this.getTitle();
    }, b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset());
    }, b.prototype.getCalcuatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, b.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template);
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    }, b.prototype.enable = function() {
        this.enabled = !0;
    }, b.prototype.disable = function() {
        this.enabled = !1;
    }, b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this._options).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, b.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
            e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c, this;
    };
}(window.jQuery), $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});