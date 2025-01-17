jQuery(function (o) {
    if ("undefined" == typeof wc_add_to_cart_params) return !1;

    function t() {
        this.requests = [], this.addRequest = this.addRequest.bind(this), this.run = this.run.bind(this), o(document.body).on("click", ".add_to_cart_button", {
            addToCartHandler: this
        }, this.onAddToCart).on("click", ".remove_from_cart_button", {
            addToCartHandler: this
        }, this.onRemoveFromCart).on("added_to_cart", this.updateButton).on("added_to_cart removed_from_cart", {
            addToCartHandler: this
        }, this.updateFragments)
    }
    t.prototype.addRequest = function (t) {
        this.requests.push(t), 1 === this.requests.length && this.run()
    }, t.prototype.run = function () {
        var t = this,
            a = t.requests[0].complete;
        t.requests[0].complete = function () {
            "function" == typeof a && a(), t.requests.shift(), 0 < t.requests.length && t.run()
        }, o.ajax(this.requests[0])
    }, t.prototype.onAddToCart = function (t) {
        var a = o(this);
        if (a.is(".ajax_add_to_cart")) {
            if (!a.attr("data-product_id")) return !0;
            t.preventDefault(), a.removeClass("added"), a.addClass("loading");
            var r = {};
            o.each(a.data(), function (t, a) {
                r[t] = a
            }), o(document.body).trigger("adding_to_cart", [a, r]), t.data.addToCartHandler.addRequest({
                type: "POST",
                url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "add_to_cart"),
                data: r,
                success: function (t) {
                    t && (t.error && t.product_url ? window.location = t.product_url : "yes" !== wc_add_to_cart_params.cart_redirect_after_add ? o(document.body).trigger("added_to_cart", [t.fragments, t.cart_hash, a]) : window.location = wc_add_to_cart_params.cart_url)
                },
                dataType: "json"
            })
        }
    }, t.prototype.onRemoveFromCart = function (t) {
        var a = o(this),
            r = a.closest(".woocommerce-mini-cart-item");
        t.preventDefault(), r.block({
            message: null,
            overlayCSS: {
                opacity: .6
            }
        }), t.data.addToCartHandler.addRequest({
            type: "POST",
            url: wc_add_to_cart_params.wc_ajax_url.toString().replace("%%endpoint%%", "remove_from_cart"),
            data: {
                cart_item_key: a.data("cart_item_key")
            },
            success: function (t) {
                t && t.fragments ? o(document.body).trigger("removed_from_cart", [t.fragments, t.cart_hash, a]) : window.location = a.attr("href")
            },
            error: function () {
                window.location = a.attr("href")
            },
            dataType: "json"
        })
    }, t.prototype.updateButton = function (t, a, r, e) {
        (e = void 0 !== e && e) && (e.removeClass("loading"), e.addClass("added"), wc_add_to_cart_params.is_cart || 0 !== e.parent().find(".added_to_cart").length || e.after(' <a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' + wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + "</a>"), o(document.body).trigger("wc_cart_button_updated", [e]))
    }, t.prototype.updateFragments = function (t, a) {
        a && (o.each(a, function (t) {
            o(t).addClass("updating").fadeTo("400", "0.6").block({
                message: null,
                overlayCSS: {
                    opacity: .6
                }
            })
        }), o.each(a, function (t, a) {
            o(t).replaceWith(a), o(t).stop(!0).css("opacity", "1").unblock()
        }), o(document.body).trigger("wc_fragments_loaded"))
    }, new t
});;
(function ($) {
    'use strict';
    $(document).ready(function () {
        $('body').on('adding_to_cart', function (event, $button, data) {
            if ($button && $button.hasClass('vc_gitem-link')) {
                $button.addClass('vc-gitem-add-to-cart-loading-btn').parents('.vc_grid-item-mini').addClass('vc-woocommerce-add-to-cart-loading').append($('<div class="vc_wc-load-add-to-loader-wrapper"><div class="vc_wc-load-add-to-loader"></div></div>'));
            }
        }).on('added_to_cart', function (event, fragments, cart_hash, $button) {
            if ('undefined' === typeof ($button)) {
                $button = $('.vc-gitem-add-to-cart-loading-btn');
            }
            if ($button && $button.hasClass('vc_gitem-link')) {
                $button.removeClass('vc-gitem-add-to-cart-loading-btn').parents('.vc_grid-item-mini').removeClass('vc-woocommerce-add-to-cart-loading').find('.vc_wc-load-add-to-loader-wrapper').remove();
            }
        });
    });
})(window.jQuery);;
(function () {
    var n, e, o, t, i, r, d, a, c, l;
    e = window.device, n = {}, window.device = n, t = window.document.documentElement, l = window.navigator.userAgent.toLowerCase(), n.ios = function () {
        return n.iphone() || n.ipod() || n.ipad()
    }, n.iphone = function () {
        return !n.windows() && i("iphone")
    }, n.ipod = function () {
        return i("ipod")
    }, n.ipad = function () {
        return i("ipad")
    }, n.android = function () {
        return !n.windows() && i("android")
    }, n.androidPhone = function () {
        return n.android() && i("mobile")
    }, n.androidTablet = function () {
        return n.android() && !i("mobile")
    }, n.blackberry = function () {
        return i("blackberry") || i("bb10") || i("rim")
    }, n.blackberryPhone = function () {
        return n.blackberry() && !i("tablet")
    }, n.blackberryTablet = function () {
        return n.blackberry() && i("tablet")
    }, n.windows = function () {
        return i("windows")
    }, n.windowsPhone = function () {
        return n.windows() && i("phone")
    }, n.windowsTablet = function () {
        return n.windows() && i("touch") && !n.windowsPhone()
    }, n.fxos = function () {
        return (i("(mobile;") || i("(tablet;")) && i("; rv:")
    }, n.fxosPhone = function () {
        return n.fxos() && i("mobile")
    }, n.fxosTablet = function () {
        return n.fxos() && i("tablet")
    }, n.meego = function () {
        return i("meego")
    }, n.cordova = function () {
        return window.cordova && "file:" === location.protocol
    }, n.nodeWebkit = function () {
        return "object" == typeof window.process
    }, n.mobile = function () {
        return n.androidPhone() || n.iphone() || n.ipod() || n.windowsPhone() || n.blackberryPhone() || n.fxosPhone() || n.meego()
    }, n.tablet = function () {
        return n.ipad() || n.androidTablet() || n.blackberryTablet() || n.windowsTablet() || n.fxosTablet()
    }, n.desktop = function () {
        return !n.tablet() && !n.mobile()
    }, n.television = function () {
        var n, e = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
        for (n = 0; n < e.length;) {
            if (i(e[n])) return !0;
            n++
        }
        return !1
    }, n.portrait = function () {
        return 1 < window.innerHeight / window.innerWidth
    }, n.landscape = function () {
        return window.innerHeight / window.innerWidth < 1
    }, n.noConflict = function () {
        return window.device = e, this
    }, i = function (n) {
        return -1 !== l.indexOf(n)
    }, d = function (n) {
        var e;
        return e = new RegExp(n, "i"), t.className.match(e)
    }, o = function (n) {
        var e = null;
        d(n) || (e = t.className.replace(/^\s+|\s+$/g, ""), t.className = e + " " + n)
    }, c = function (n) {
        d(n) && (t.className = t.className.replace(" " + n, ""))
    }, n.ios() ? n.ipad() ? o("ios ipad tablet") : n.iphone() ? o("ios iphone mobile") : n.ipod() && o("ios ipod mobile") : n.android() ? n.androidTablet() ? o("android tablet") : o("android mobile") : n.blackberry() ? n.blackberryTablet() ? o("blackberry tablet") : o("blackberry mobile") : n.windows() ? n.windowsTablet() ? o("windows tablet") : n.windowsPhone() ? o("windows mobile") : o("desktop") : n.fxos() ? n.fxosTablet() ? o("fxos tablet") : o("fxos mobile") : n.meego() ? o("meego mobile") : n.nodeWebkit() ? o("node-webkit") : n.television() ? o("television") : n.desktop() && o("desktop"), n.cordova() && o("cordova"), r = function () {
        n.landscape() ? (c("portrait"), o("landscape")) : (c("landscape"), o("portrait"))
    }, a = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(a, r, !1) : window.attachEvent ? window.attachEvent(a, r) : window[a] = r, r(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return n
    }) : "undefined" != typeof module && module.exports ? module.exports = n : window.device = n
}).call(this);
