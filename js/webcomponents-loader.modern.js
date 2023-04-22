/*! For license information please see webcomponents-loader.modern.js.LICENSE.txt */
!function(e) {
    var n = {};
    function t(o) {
        if (n[o])
            return n[o].exports;
        var r = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t),
        r.l = !0,
        r.exports
    }
    t.m = e,
    t.c = n,
    t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        })
    }
    ,
    t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(e, n) {
        if (1 & n && (e = t(e)),
        8 & n)
            return e;
        if (4 & n && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (t.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & n && "string" != typeof e)
            for (var r in e)
                t.d(o, r, function(n) {
                    return e[n]
                }
                .bind(null, r));
        return o
    }
    ,
    t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(n, "a", n),
        n
    }
    ,
    t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(e, n, t) {
    "use strict";
    t.r(n);
    t(1)
}
, function(e, n) {
    !function() {
        "use strict";
        var e, n = !1, t = [], o = !1;
        function r() {
            window.WebComponents.ready = !0,
            document.dispatchEvent(new CustomEvent("WebComponentsReady",{
                bubbles: !0
            }))
        }
        function i() {
            window.customElements && customElements.polyfillWrapFlushCallback && customElements.polyfillWrapFlushCallback((function(n) {
                e = n,
                o && e()
            }
            ))
        }
        function d() {
            window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(window.document),
            n = !0,
            c().then(r)
        }
        function c() {
            o = !1;
            var n = t.map((function(e) {
                return e instanceof Function ? e() : e
            }
            ));
            return t = [],
            Promise.all(n).then((function() {
                o = !0,
                e && e()
            }
            )).catch((function(e) {
                console.error(e)
            }
            ))
        }
        window.WebComponents = window.WebComponents || {},
        window.WebComponents.ready = window.WebComponents.ready || !1,
        window.WebComponents.waitFor = window.WebComponents.waitFor || function(e) {
            e && (t.push(e),
            n && c())
        }
        ,
        window.WebComponents._batchCustomElements = i;
        var l = "webcomponents-loader.js"
          , u = [];
        (!("attachShadow"in Element.prototype) || !("getRootNode"in Element.prototype) || window.ShadyDOM && window.ShadyDOM.force) && u.push("sd"),
        window.customElements && !window.customElements.forcePolyfill || u.push("ce");
        var a = function() {
            var e = document.createElement("template");
            if (!("content"in e))
                return !0;
            if (!(e.content.cloneNode()instanceof DocumentFragment))
                return !0;
            var n = document.createElement("template");
            n.content.appendChild(document.createElement("div")),
            e.content.appendChild(n);
            var t = e.cloneNode(!0);
            return 0 === t.content.childNodes.length || 0 === t.content.firstChild.content.childNodes.length
        }();
        if (window.Promise && Array.from && window.URL && window.Symbol && !a || (u = ["sd-ce-pf"]),
        u.length) {
            var s, m = "bundles/webcomponents-" + u.join("-") + ".js";
            if (window.WebComponents.root)
                s = window.WebComponents.root + m;
            else {
                var p = document.querySelector('script[src*="' + l + '"]');
                s = p.src.replace(l, m)
            }
            var w = document.createElement("script");
            w.src = s,
            "loading" === document.readyState ? (w.setAttribute("onload", "window.WebComponents._batchCustomElements()"),
            document.write(w.outerHTML),
            document.addEventListener("DOMContentLoaded", d)) : (w.addEventListener("load", (function() {
                i(),
                d()
            }
            )),
            w.addEventListener("error", (function() {
                throw new Error("Could not load polyfill bundle" + s)
            }
            )),
            document.head.appendChild(w))
        } else
            "complete" === document.readyState ? (n = !0,
            r()) : (window.addEventListener("load", d),
            window.addEventListener("DOMContentLoaded", (function() {
                window.removeEventListener("load", d),
                d()
            }
            )))
    }()
}
]);
