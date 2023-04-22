/*! For license information please see cart.web-component.modern.js.LICENSE.txt */
!function(t) {
    var e = {};
    function i(s) {
        if (e[s])
            return e[s].exports;
        var o = e[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(o.exports, o, o.exports, i),
        o.l = !0,
        o.exports
    }
    i.m = t,
    i.c = e,
    i.d = function(t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }
    ,
    i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(t, e) {
        if (1 & e && (t = i(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var s = Object.create(null);
        if (i.r(s),
        Object.defineProperty(s, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var o in t)
                i.d(s, o, function(e) {
                    return t[e]
                }
                .bind(null, o));
        return s
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    i.p = "",
    i(i.s = 0)
}([function(t, e, i) {
    "use strict";
    i.r(e),
    i.d(e, "CartItem", (function() {
        return Ot
    }
    )),
    i.d(e, "ProductDialog", (function() {
        return Dt
    }
    )),
    i.d(e, "ButtonWithLoaderWebComponent", (function() {
        return Bt
    }
    )),
    i.d(e, "ProductSlider", (function() {
        return ue
    }
    )),
    i.d(e, "ProductPrice", (function() {
        return me
    }
    )),
    i.d(e, "StepInfoFooterWebComponent", (function() {
        return ke
    }
    )),
    i.d(e, "ProductSelectorWebComponent", (function() {
        return Pe
    }
    ));
    const s = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets"in Document.prototype && "replace"in CSSStyleSheet.prototype
      , o = Symbol()
      , n = new Map;
    class r {
        constructor(t, e) {
            if (this._$cssResult$ = !0,
            e !== o)
                throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t
        }
        get styleSheet() {
            let t = n.get(this.cssText);
            return s && void 0 === t && (n.set(this.cssText, t = new CSSStyleSheet),
            t.replaceSync(this.cssText)),
            t
        }
        toString() {
            return this.cssText
        }
    }
    const a = s ? t=>t : t=>t instanceof CSSStyleSheet ? (t=>{
        let e = "";
        for (const i of t.cssRules)
            e += i.cssText;
        return (t=>new r("string" == typeof t ? t : t + "",o))(e)
    }
    )(t) : t;
    var l;
    const d = window.trustedTypes
      , c = d ? d.emptyScript : ""
      , u = window.reactiveElementPolyfillSupport
      , h = {
        toAttribute(t, e) {
            switch (e) {
            case Boolean:
                t = t ? c : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t)
            }
            return t
        },
        fromAttribute(t, e) {
            let i = t;
            switch (e) {
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t)
                } catch (t) {
                    i = null
                }
            }
            return i
        }
    }
      , p = (t,e)=>e !== t && (e == e || t == t)
      , v = {
        attribute: !0,
        type: String,
        converter: h,
        reflect: !1,
        hasChanged: p
    };
    class m extends HTMLElement {
        constructor() {
            super(),
            this._$Et = new Map,
            this.isUpdatePending = !1,
            this.hasUpdated = !1,
            this._$Ei = null,
            this.o()
        }
        static addInitializer(t) {
            var e;
            null !== (e = this.l) && void 0 !== e || (this.l = []),
            this.l.push(t)
        }
        static get observedAttributes() {
            this.finalize();
            const t = [];
            return this.elementProperties.forEach(((e,i)=>{
                const s = this._$Eh(i, e);
                void 0 !== s && (this._$Eu.set(s, i),
                t.push(s))
            }
            )),
            t
        }
        static createProperty(t, e=v) {
            if (e.state && (e.attribute = !1),
            this.finalize(),
            this.elementProperties.set(t, e),
            !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
                const i = "symbol" == typeof t ? Symbol() : "__" + t
                  , s = this.getPropertyDescriptor(t, i, e);
                void 0 !== s && Object.defineProperty(this.prototype, t, s)
            }
        }
        static getPropertyDescriptor(t, e, i) {
            return {
                get() {
                    return this[e]
                },
                set(s) {
                    const o = this[t];
                    this[e] = s,
                    this.requestUpdate(t, o, i)
                },
                configurable: !0,
                enumerable: !0
            }
        }
        static getPropertyOptions(t) {
            return this.elementProperties.get(t) || v
        }
        static finalize() {
            if (this.hasOwnProperty("finalized"))
                return !1;
            this.finalized = !0;
            const t = Object.getPrototypeOf(this);
            if (t.finalize(),
            this.elementProperties = new Map(t.elementProperties),
            this._$Eu = new Map,
            this.hasOwnProperty("properties")) {
                const t = this.properties
                  , e = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
                for (const i of e)
                    this.createProperty(i, t[i])
            }
            return this.elementStyles = this.finalizeStyles(this.styles),
            !0
        }
        static finalizeStyles(t) {
            const e = [];
            if (Array.isArray(t)) {
                const i = new Set(t.flat(1 / 0).reverse());
                for (const t of i)
                    e.unshift(a(t))
            } else
                void 0 !== t && e.push(a(t));
            return e
        }
        static _$Eh(t, e) {
            const i = e.attribute;
            return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0
        }
        o() {
            var t;
            this._$Ep = new Promise((t=>this.enableUpdating = t)),
            this._$AL = new Map,
            this._$Em(),
            this.requestUpdate(),
            null === (t = this.constructor.l) || void 0 === t || t.forEach((t=>t(this)))
        }
        addController(t) {
            var e, i;
            (null !== (e = this._$Eg) && void 0 !== e ? e : this._$Eg = []).push(t),
            void 0 !== this.renderRoot && this.isConnected && (null === (i = t.hostConnected) || void 0 === i || i.call(t))
        }
        removeController(t) {
            var e;
            null === (e = this._$Eg) || void 0 === e || e.splice(this._$Eg.indexOf(t) >>> 0, 1)
        }
        _$Em() {
            this.constructor.elementProperties.forEach(((t,e)=>{
                this.hasOwnProperty(e) && (this._$Et.set(e, this[e]),
                delete this[e])
            }
            ))
        }
        createRenderRoot() {
            var t;
            const e = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
            return i = e,
            o = this.constructor.elementStyles,
            s ? i.adoptedStyleSheets = o.map((t=>t instanceof CSSStyleSheet ? t : t.styleSheet)) : o.forEach((t=>{
                const e = document.createElement("style")
                  , s = window.litNonce;
                void 0 !== s && e.setAttribute("nonce", s),
                e.textContent = t.cssText,
                i.appendChild(e)
            }
            )),
            e;
            var i, o
        }
        connectedCallback() {
            var t;
            void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
            this.enableUpdating(!0),
            null === (t = this._$Eg) || void 0 === t || t.forEach((t=>{
                var e;
                return null === (e = t.hostConnected) || void 0 === e ? void 0 : e.call(t)
            }
            ))
        }
        enableUpdating(t) {}
        disconnectedCallback() {
            var t;
            null === (t = this._$Eg) || void 0 === t || t.forEach((t=>{
                var e;
                return null === (e = t.hostDisconnected) || void 0 === e ? void 0 : e.call(t)
            }
            ))
        }
        attributeChangedCallback(t, e, i) {
            this._$AK(t, i)
        }
        _$ES(t, e, i=v) {
            var s, o;
            const n = this.constructor._$Eh(t, i);
            if (void 0 !== n && !0 === i.reflect) {
                const r = (null !== (o = null === (s = i.converter) || void 0 === s ? void 0 : s.toAttribute) && void 0 !== o ? o : h.toAttribute)(e, i.type);
                this._$Ei = t,
                null == r ? this.removeAttribute(n) : this.setAttribute(n, r),
                this._$Ei = null
            }
        }
        _$AK(t, e) {
            var i, s, o;
            const n = this.constructor
              , r = n._$Eu.get(t);
            if (void 0 !== r && this._$Ei !== r) {
                const t = n.getPropertyOptions(r)
                  , a = t.converter
                  , l = null !== (o = null !== (s = null === (i = a) || void 0 === i ? void 0 : i.fromAttribute) && void 0 !== s ? s : "function" == typeof a ? a : null) && void 0 !== o ? o : h.fromAttribute;
                this._$Ei = r,
                this[r] = l(e, t.type),
                this._$Ei = null
            }
        }
        requestUpdate(t, e, i) {
            let s = !0;
            void 0 !== t && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || p)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e),
            !0 === i.reflect && this._$Ei !== t && (void 0 === this._$EC && (this._$EC = new Map),
            this._$EC.set(t, i))) : s = !1),
            !this.isUpdatePending && s && (this._$Ep = this._$E_())
        }
        async _$E_() {
            this.isUpdatePending = !0;
            try {
                await this._$Ep
            } catch (t) {
                Promise.reject(t)
            }
            const t = this.scheduleUpdate();
            return null != t && await t,
            !this.isUpdatePending
        }
        scheduleUpdate() {
            return this.performUpdate()
        }
        performUpdate() {
            var t;
            if (!this.isUpdatePending)
                return;
            this.hasUpdated,
            this._$Et && (this._$Et.forEach(((t,e)=>this[e] = t)),
            this._$Et = void 0);
            let e = !1;
            const i = this._$AL;
            try {
                e = this.shouldUpdate(i),
                e ? (this.willUpdate(i),
                null === (t = this._$Eg) || void 0 === t || t.forEach((t=>{
                    var e;
                    return null === (e = t.hostUpdate) || void 0 === e ? void 0 : e.call(t)
                }
                )),
                this.update(i)) : this._$EU()
            } catch (t) {
                throw e = !1,
                this._$EU(),
                t
            }
            e && this._$AE(i)
        }
        willUpdate(t) {}
        _$AE(t) {
            var e;
            null === (e = this._$Eg) || void 0 === e || e.forEach((t=>{
                var e;
                return null === (e = t.hostUpdated) || void 0 === e ? void 0 : e.call(t)
            }
            )),
            this.hasUpdated || (this.hasUpdated = !0,
            this.firstUpdated(t)),
            this.updated(t)
        }
        _$EU() {
            this._$AL = new Map,
            this.isUpdatePending = !1
        }
        get updateComplete() {
            return this.getUpdateComplete()
        }
        getUpdateComplete() {
            return this._$Ep
        }
        shouldUpdate(t) {
            return !0
        }
        update(t) {
            void 0 !== this._$EC && (this._$EC.forEach(((t,e)=>this._$ES(e, this[e], t))),
            this._$EC = void 0),
            this._$EU()
        }
        updated(t) {}
        firstUpdated(t) {}
    }
    var b;
    m.finalized = !0,
    m.elementProperties = new Map,
    m.elementStyles = [],
    m.shadowRootOptions = {
        mode: "open"
    },
    null == u || u({
        ReactiveElement: m
    }),
    (null !== (l = globalThis.reactiveElementVersions) && void 0 !== l ? l : globalThis.reactiveElementVersions = []).push("1.3.2");
    const _ = globalThis.trustedTypes
      , g = _ ? _.createPolicy("lit-html", {
        createHTML: t=>t
    }) : void 0
      , f = `lit$${(Math.random() + "").slice(9)}$`
      , y = "?" + f
      , $ = `<${y}>`
      , w = document
      , A = (t="")=>w.createComment(t)
      , k = t=>null === t || "object" != typeof t && "function" != typeof t
      , E = Array.isArray
      , C = t=>{
        var e;
        return E(t) || "function" == typeof (null === (e = t) || void 0 === e ? void 0 : e[Symbol.iterator])
    }
      , S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
      , P = /-->/g
      , O = />/g
      , x = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g
      , R = /'/g
      , L = /"/g
      , T = /^(?:script|style|textarea|title)$/i
      , I = t=>(e,...i)=>({
        _$litType$: t,
        strings: e,
        values: i
    })
      , U = I(1)
      , H = (I(2),
    Symbol.for("lit-noChange"))
      , j = Symbol.for("lit-nothing")
      , D = new WeakMap
      , M = w.createTreeWalker(w, 129, null, !1)
      , N = (t,e)=>{
        const i = t.length - 1
          , s = [];
        let o, n = 2 === e ? "<svg>" : "", r = S;
        for (let e = 0; e < i; e++) {
            const i = t[e];
            let a, l, d = -1, c = 0;
            for (; c < i.length && (r.lastIndex = c,
            l = r.exec(i),
            null !== l); )
                c = r.lastIndex,
                r === S ? "!--" === l[1] ? r = P : void 0 !== l[1] ? r = O : void 0 !== l[2] ? (T.test(l[2]) && (o = RegExp("</" + l[2], "g")),
                r = x) : void 0 !== l[3] && (r = x) : r === x ? ">" === l[0] ? (r = null != o ? o : S,
                d = -1) : void 0 === l[1] ? d = -2 : (d = r.lastIndex - l[2].length,
                a = l[1],
                r = void 0 === l[3] ? x : '"' === l[3] ? L : R) : r === L || r === R ? r = x : r === P || r === O ? r = S : (r = x,
                o = void 0);
            const u = r === x && t[e + 1].startsWith("/>") ? " " : "";
            n += r === S ? i + $ : d >= 0 ? (s.push(a),
            i.slice(0, d) + "$lit$" + i.slice(d) + f + u) : i + f + (-2 === d ? (s.push(void 0),
            e) : u)
        }
        const a = n + (t[i] || "<?>") + (2 === e ? "</svg>" : "");
        if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
            throw Error("invalid template strings array");
        return [void 0 !== g ? g.createHTML(a) : a, s]
    }
    ;
    class F {
        constructor({strings: t, _$litType$: e}, i) {
            let s;
            this.parts = [];
            let o = 0
              , n = 0;
            const r = t.length - 1
              , a = this.parts
              , [l,d] = N(t, e);
            if (this.el = F.createElement(l, i),
            M.currentNode = this.el.content,
            2 === e) {
                const t = this.el.content
                  , e = t.firstChild;
                e.remove(),
                t.append(...e.childNodes)
            }
            for (; null !== (s = M.nextNode()) && a.length < r; ) {
                if (1 === s.nodeType) {
                    if (s.hasAttributes()) {
                        const t = [];
                        for (const e of s.getAttributeNames())
                            if (e.endsWith("$lit$") || e.startsWith(f)) {
                                const i = d[n++];
                                if (t.push(e),
                                void 0 !== i) {
                                    const t = s.getAttribute(i.toLowerCase() + "$lit$").split(f)
                                      , e = /([.?@])?(.*)/.exec(i);
                                    a.push({
                                        type: 1,
                                        index: o,
                                        name: e[2],
                                        strings: t,
                                        ctor: "." === e[1] ? V : "?" === e[1] ? X : "@" === e[1] ? K : q
                                    })
                                } else
                                    a.push({
                                        type: 6,
                                        index: o
                                    })
                            }
                        for (const e of t)
                            s.removeAttribute(e)
                    }
                    if (T.test(s.tagName)) {
                        const t = s.textContent.split(f)
                          , e = t.length - 1;
                        if (e > 0) {
                            s.textContent = _ ? _.emptyScript : "";
                            for (let i = 0; i < e; i++)
                                s.append(t[i], A()),
                                M.nextNode(),
                                a.push({
                                    type: 2,
                                    index: ++o
                                });
                            s.append(t[e], A())
                        }
                    }
                } else if (8 === s.nodeType)
                    if (s.data === y)
                        a.push({
                            type: 2,
                            index: o
                        });
                    else {
                        let t = -1;
                        for (; -1 !== (t = s.data.indexOf(f, t + 1)); )
                            a.push({
                                type: 7,
                                index: o
                            }),
                            t += f.length - 1
                    }
                o++
            }
        }
        static createElement(t, e) {
            const i = w.createElement("template");
            return i.innerHTML = t,
            i
        }
    }
    function W(t, e, i=t, s) {
        var o, n, r, a;
        if (e === H)
            return e;
        let l = void 0 !== s ? null === (o = i._$Cl) || void 0 === o ? void 0 : o[s] : i._$Cu;
        const d = k(e) ? void 0 : e._$litDirective$;
        return (null == l ? void 0 : l.constructor) !== d && (null === (n = null == l ? void 0 : l._$AO) || void 0 === n || n.call(l, !1),
        void 0 === d ? l = void 0 : (l = new d(t),
        l._$AT(t, i, s)),
        void 0 !== s ? (null !== (r = (a = i)._$Cl) && void 0 !== r ? r : a._$Cl = [])[s] = l : i._$Cu = l),
        void 0 !== l && (e = W(t, l._$AS(t, e.values), l, s)),
        e
    }
    class B {
        constructor(t, e) {
            this.v = [],
            this._$AN = void 0,
            this._$AD = t,
            this._$AM = e
        }
        get parentNode() {
            return this._$AM.parentNode
        }
        get _$AU() {
            return this._$AM._$AU
        }
        p(t) {
            var e;
            const {el: {content: i}, parts: s} = this._$AD
              , o = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : w).importNode(i, !0);
            M.currentNode = o;
            let n = M.nextNode()
              , r = 0
              , a = 0
              , l = s[0];
            for (; void 0 !== l; ) {
                if (r === l.index) {
                    let e;
                    2 === l.type ? e = new Q(n,n.nextSibling,this,t) : 1 === l.type ? e = new l.ctor(n,l.name,l.strings,this,t) : 6 === l.type && (e = new Z(n,this,t)),
                    this.v.push(e),
                    l = s[++a]
                }
                r !== (null == l ? void 0 : l.index) && (n = M.nextNode(),
                r++)
            }
            return o
        }
        m(t) {
            let e = 0;
            for (const i of this.v)
                void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e),
                e += i.strings.length - 2) : i._$AI(t[e])),
                e++
        }
    }
    class Q {
        constructor(t, e, i, s) {
            var o;
            this.type = 2,
            this._$AH = j,
            this._$AN = void 0,
            this._$AA = t,
            this._$AB = e,
            this._$AM = i,
            this.options = s,
            this._$Cg = null === (o = null == s ? void 0 : s.isConnected) || void 0 === o || o
        }
        get _$AU() {
            var t, e;
            return null !== (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== e ? e : this._$Cg
        }
        get parentNode() {
            let t = this._$AA.parentNode;
            const e = this._$AM;
            return void 0 !== e && 11 === t.nodeType && (t = e.parentNode),
            t
        }
        get startNode() {
            return this._$AA
        }
        get endNode() {
            return this._$AB
        }
        _$AI(t, e=this) {
            t = W(this, t, e),
            k(t) ? t === j || null == t || "" === t ? (this._$AH !== j && this._$AR(),
            this._$AH = j) : t !== this._$AH && t !== H && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.k(t) : C(t) ? this.S(t) : this.$(t)
        }
        M(t, e=this._$AB) {
            return this._$AA.parentNode.insertBefore(t, e)
        }
        k(t) {
            this._$AH !== t && (this._$AR(),
            this._$AH = this.M(t))
        }
        $(t) {
            this._$AH !== j && k(this._$AH) ? this._$AA.nextSibling.data = t : this.k(w.createTextNode(t)),
            this._$AH = t
        }
        T(t) {
            var e;
            const {values: i, _$litType$: s} = t
              , o = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = F.createElement(s.h, this.options)),
            s);
            if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === o)
                this._$AH.m(i);
            else {
                const t = new B(o,this)
                  , e = t.p(this.options);
                t.m(i),
                this.k(e),
                this._$AH = t
            }
        }
        _$AC(t) {
            let e = D.get(t.strings);
            return void 0 === e && D.set(t.strings, e = new F(t)),
            e
        }
        S(t) {
            E(this._$AH) || (this._$AH = [],
            this._$AR());
            const e = this._$AH;
            let i, s = 0;
            for (const o of t)
                s === e.length ? e.push(i = new Q(this.M(A()),this.M(A()),this,this.options)) : i = e[s],
                i._$AI(o),
                s++;
            s < e.length && (this._$AR(i && i._$AB.nextSibling, s),
            e.length = s)
        }
        _$AR(t=this._$AA.nextSibling, e) {
            var i;
            for (null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
                const e = t.nextSibling;
                t.remove(),
                t = e
            }
        }
        setConnected(t) {
            var e;
            void 0 === this._$AM && (this._$Cg = t,
            null === (e = this._$AP) || void 0 === e || e.call(this, t))
        }
    }
    class q {
        constructor(t, e, i, s, o) {
            this.type = 1,
            this._$AH = j,
            this._$AN = void 0,
            this.element = t,
            this.name = e,
            this._$AM = s,
            this.options = o,
            i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String),
            this.strings = i) : this._$AH = j
        }
        get tagName() {
            return this.element.tagName
        }
        get _$AU() {
            return this._$AM._$AU
        }
        _$AI(t, e=this, i, s) {
            const o = this.strings;
            let n = !1;
            if (void 0 === o)
                t = W(this, t, e, 0),
                n = !k(t) || t !== this._$AH && t !== H,
                n && (this._$AH = t);
            else {
                const s = t;
                let r, a;
                for (t = o[0],
                r = 0; r < o.length - 1; r++)
                    a = W(this, s[i + r], e, r),
                    a === H && (a = this._$AH[r]),
                    n || (n = !k(a) || a !== this._$AH[r]),
                    a === j ? t = j : t !== j && (t += (null != a ? a : "") + o[r + 1]),
                    this._$AH[r] = a
            }
            n && !s && this.C(t)
        }
        C(t) {
            t === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "")
        }
    }
    class V extends q {
        constructor() {
            super(...arguments),
            this.type = 3
        }
        C(t) {
            this.element[this.name] = t === j ? void 0 : t
        }
    }
    const z = _ ? _.emptyScript : "";
    class X extends q {
        constructor() {
            super(...arguments),
            this.type = 4
        }
        C(t) {
            t && t !== j ? this.element.setAttribute(this.name, z) : this.element.removeAttribute(this.name)
        }
    }
    class K extends q {
        constructor(t, e, i, s, o) {
            super(t, e, i, s, o),
            this.type = 5
        }
        _$AI(t, e=this) {
            var i;
            if ((t = null !== (i = W(this, t, e, 0)) && void 0 !== i ? i : j) === H)
                return;
            const s = this._$AH
              , o = t === j && s !== j || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive
              , n = t !== j && (s === j || o);
            o && this.element.removeEventListener(this.name, this, s),
            n && this.element.addEventListener(this.name, this, t),
            this._$AH = t
        }
        handleEvent(t) {
            var e, i;
            "function" == typeof this._$AH ? this._$AH.call(null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i ? i : this.element, t) : this._$AH.handleEvent(t)
        }
    }
    class Z {
        constructor(t, e, i) {
            this.element = t,
            this.type = 6,
            this._$AN = void 0,
            this._$AM = e,
            this.options = i
        }
        get _$AU() {
            return this._$AM._$AU
        }
        _$AI(t) {
            W(this, t)
        }
    }
    const G = {
        L: "$lit$",
        P: f,
        V: y,
        I: 1,
        N,
        R: B,
        j: C,
        D: W,
        H: Q,
        F: q,
        O: X,
        W: K,
        B: V,
        Z
    }
      , J = window.litHtmlPolyfillSupport;
    var Y, tt;
    null == J || J(F, Q),
    (null !== (b = globalThis.litHtmlVersions) && void 0 !== b ? b : globalThis.litHtmlVersions = []).push("2.2.5");
    class et extends m {
        constructor() {
            super(...arguments),
            this.renderOptions = {
                host: this
            },
            this._$Dt = void 0
        }
        createRenderRoot() {
            var t, e;
            const i = super.createRenderRoot();
            return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild),
            i
        }
        update(t) {
            const e = this.render();
            this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            this._$Dt = ((t,e,i)=>{
                var s, o;
                const n = null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s ? s : e;
                let r = n._$litPart$;
                if (void 0 === r) {
                    const t = null !== (o = null == i ? void 0 : i.renderBefore) && void 0 !== o ? o : null;
                    n._$litPart$ = r = new Q(e.insertBefore(A(), t),t,void 0,null != i ? i : {})
                }
                return r._$AI(t),
                r
            }
            )(e, this.renderRoot, this.renderOptions)
        }
        connectedCallback() {
            var t;
            super.connectedCallback(),
            null === (t = this._$Dt) || void 0 === t || t.setConnected(!0)
        }
        disconnectedCallback() {
            var t;
            super.disconnectedCallback(),
            null === (t = this._$Dt) || void 0 === t || t.setConnected(!1)
        }
        render() {
            return H
        }
    }
    et.finalized = !0,
    et._$litElement$ = !0,
    null === (Y = globalThis.litElementHydrateSupport) || void 0 === Y || Y.call(globalThis, {
        LitElement: et
    });
    const it = globalThis.litElementPolyfillSupport;
    null == it || it({
        LitElement: et
    });
    (null !== (tt = globalThis.litElementVersions) && void 0 !== tt ? tt : globalThis.litElementVersions = []).push("3.2.0");
    const st = t=>e=>"function" == typeof e ? ((t,e)=>(window.customElements.define(t, e),
    e))(t, e) : ((t,e)=>{
        const {kind: i, elements: s} = e;
        return {
            kind: i,
            elements: s,
            finisher(e) {
                window.customElements.define(t, e)
            }
        }
    }
    )(t, e)
      , ot = (t,e)=>"method" === e.kind && e.descriptor && !("value"in e.descriptor) ? {
        ...e,
        finisher(i) {
            i.createProperty(e.key, t)
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: e.key,
        initializer() {
            "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this))
        },
        finisher(i) {
            i.createProperty(e.key, t)
        }
    };
    function nt(t) {
        return (e,i)=>void 0 !== i ? ((t,e,i)=>{
            e.constructor.createProperty(i, t)
        }
        )(t, e, i) : ot(t, e)
    }
    function rt(t) {
        return nt({
            ...t,
            state: !0
        })
    }
    const at = ({finisher: t, descriptor: e})=>(i,s)=>{
        var o;
        if (void 0 === s) {
            const s = null !== (o = i.originalKey) && void 0 !== o ? o : i.key
              , n = null != e ? {
                kind: "method",
                placement: "prototype",
                key: s,
                descriptor: e(i.key)
            } : {
                ...i,
                key: s
            };
            return null != t && (n.finisher = function(e) {
                t(e, s)
            }
            ),
            n
        }
        {
            const o = i.constructor;
            void 0 !== e && Object.defineProperty(i, s, e(s)),
            null == t || t(o, s)
        }
    }
    ;
    var lt;
    null === (lt = window.HTMLSlotElement) || void 0 === lt || lt.prototype.assignedElements;
    const dt = 1
      , ct = 2
      , ut = 3
      , ht = 4
      , pt = t=>(...e)=>({
        _$litDirective$: t,
        values: e
    });
    class vt {
        constructor(t) {}
        get _$AU() {
            return this._$AM._$AU
        }
        _$AT(t, e, i) {
            this._$Ct = t,
            this._$AM = e,
            this._$Ci = i
        }
        _$AS(t, e) {
            return this.update(t, e)
        }
        update(t, e) {
            return this.render(...e)
        }
    }
    const mt = pt(class extends vt {
        constructor(t) {
            var e;
            if (super(t),
            t.type !== dt || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
                throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")
        }
        render(t) {
            return Object.keys(t).reduce(((e,i)=>{
                const s = t[i];
                return null == s ? e : e + `${i = i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`
            }
            ), "")
        }
        update(t, [e]) {
            const {style: i} = t.element;
            if (void 0 === this.ct) {
                this.ct = new Set;
                for (const t in e)
                    this.ct.add(t);
                return this.render(e)
            }
            this.ct.forEach((t=>{
                null == e[t] && (this.ct.delete(t),
                t.includes("-") ? i.removeProperty(t) : i[t] = "")
            }
            ));
            for (const t in e) {
                const s = e[t];
                null != s && (this.ct.add(t),
                t.includes("-") ? i.setProperty(t, s) : i[t] = s)
            }
            return H
        }
    }
    )
      , {H: bt} = G
      , _t = {}
      , gt = pt(class extends vt {
        constructor(t) {
            if (super(t),
            t.type !== ut && t.type !== dt && t.type !== ht)
                throw Error("The `live` directive is not allowed on child or event bindings");
            if (void 0 !== t.strings)
                throw Error("`live` bindings can only contain a single expression")
        }
        render(t) {
            return t
        }
        update(t, [e]) {
            if (e === H || e === j)
                return e;
            const i = t.element
              , s = t.name;
            if (t.type === ut) {
                if (e === i[s])
                    return H
            } else if (t.type === ht) {
                if (!!e === i.hasAttribute(s))
                    return H
            } else if (t.type === dt && i.getAttribute(s) === e + "")
                return H;
            return ((t,e=_t)=>{
                t._$AH = e
            }
            )(t),
            e
        }
    }
    )
      , ft = pt(class extends vt {
        constructor(t) {
            var e;
            if (super(t),
            t.type !== dt || "class" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
                throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
        }
        render(t) {
            return " " + Object.keys(t).filter((e=>t[e])).join(" ") + " "
        }
        update(t, [e]) {
            var i, s;
            if (void 0 === this.et) {
                this.et = new Set,
                void 0 !== t.strings && (this.st = new Set(t.strings.join(" ").split(/\s/).filter((t=>"" !== t))));
                for (const t in e)
                    e[t] && !(null === (i = this.st) || void 0 === i ? void 0 : i.has(t)) && this.et.add(t);
                return this.render(e)
            }
            const o = t.element.classList;
            this.et.forEach((t=>{
                t in e || (o.remove(t),
                this.et.delete(t))
            }
            ));
            for (const t in e) {
                const i = !!e[t];
                i === this.et.has(t) || (null === (s = this.st) || void 0 === s ? void 0 : s.has(t)) || (i ? (o.add(t),
                this.et.add(t)) : (o.remove(t),
                this.et.delete(t)))
            }
            return H
        }
    }
    );
    class yt extends vt {
        constructor(t) {
            if (super(t),
            this.it = j,
            t.type !== ct)
                throw Error(this.constructor.directiveName + "() can only be used in child bindings")
        }
        render(t) {
            if (t === j || null == t)
                return this.ft = void 0,
                this.it = t;
            if (t === H)
                return t;
            if ("string" != typeof t)
                throw Error(this.constructor.directiveName + "() called with a non-string value");
            if (t === this.it)
                return this.ft;
            this.it = t;
            const e = [t];
            return e.raw = e,
            this.ft = {
                _$litType$: this.constructor.resultType,
                strings: e,
                values: []
            }
        }
    }
    yt.directiveName = "unsafeHTML",
    yt.resultType = 1;
    const $t = pt(yt)
      , wt = "sb-hidden"
      , At = "sb-round-icon_disabled";
    let kt, Et, Ct, St = t=>t;
    var Pt = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let Ot = class extends et {
        constructor() {
            super(...arguments),
            this.showQuantityOverflowWarning = !1
        }
        get productPricePerUnit() {
            const t = window.tb.utils.numberWithSpaces(this.product.price) + " ₽"
              , e = this.product.quantity.toString();
            return this.product.quantity > 1 ? `${e} ${this.unit} x ${t}` : `Цена за ${this.unit}`
        }
        get amount() {
            return `${window.tb.utils.numberWithSpaces(this.product.amount)} ₽`
        }
        get oldAmount() {
            return `${window.tb.utils.numberWithSpaces(this.product.oldPrice * this.product.quantity)} ₽`
        }
        get canDecrement() {
            return 1 !== this.product.quantity
        }
        get canIncrement() {
            return this.product.quantity < this.product.maxQuantity
        }
        get previewStyles() {
            var t;
            return {
                backgroundImage: `url(${null !== (t = this.product.preview) && void 0 !== t ? t : window.tb.utils.staticPath("images/cart/empty_product.svg")})`
            }
        }
        get counterInputStyles() {
            return {
                width: this.calculateCounterInputWidth(this.product.quantity.toString().length)
            }
        }
        get isOutOfStock() {
            return this.product.isHidden || 0 === this.product.quantity
        }
        get unit() {
            return Boolean(this.product.unit) ? window.tb.utils.toSuperscriptUnit(this.product.unit) : "шт"
        }
        get counterWarningText() {
            return `В наличии ${this.product.maxQuantity} ${this.unit}`
        }
        set counterInputValue(t) {
            this.counterInputElement.value = t.toString(),
            this.counterInputElement.style.width = this.calculateCounterInputWidth(this.counterInputElement.value.length)
        }
        imageTemplate() {
            return U(kt || (kt = St`
            <div class="s-basket__item-image-wrapper">
                <div class="s-basket__item-image">
                    <div style=${0} class="sb-image-square"></div>
                </div>
            </div>
        `), mt(this.previewStyles))
        }
        counterTemplate() {
            return U(Et || (Et = St`
            <div
                class="s-basket__data-counter ${0}"
            >
                <div
                    aria-label="Уменьшить количество товара"
                    role="button"
                    class="s-basket__data-counter-button s-basket__data-counter-button_minus"
                    @click=${0}
                >
                    <div
                        class="sb-round-icon sb-round-icon_minus ${0}"
                    >
                        <img src="${0}" alt="-" />
                    </div>
                </div>
                <input
                    id="counter"
                    style=${0}
                    type="number"
                    min=${0}
                    max=${0}
                    step=${0}
                    aria-label="Количество товара"
                    .value=${0}
                    class="s-basket__data-counter-number sb-font-p2 ${0}"
                    @blur=${0}
                    @keyup=${0}
                />
                <div
                    aria-label="Добавить количество товара"
                    role="button"
                    class="s-basket__data-counter-button s-basket__data-counter-button_plus"
                    @click=${0}
                >
                    <div
                        class="sb-round-icon sb-round-icon_plus ${0}"
                    >
                        <img src="${0}" alt="+" />
                    </div>
                </div>
            </div>
        `), ft({
                [wt]: this.isOutOfStock
            }), this.handleDecrementClick, ft({
                [At]: !this.canDecrement
            }), window.tb.utils.staticPath("images/cart/removeItem.svg"), mt(this.counterInputStyles), 1, this.product.maxQuantity, 1, gt(this.product.quantity.toString()), ft({
                "s-basket__data-counter-number_overflowing": this.showQuantityOverflowWarning
            }), this.handleCounterBlur, this.handleCounterKeyUp, this.handleIncrementClick, ft({
                [At]: !this.canIncrement
            }), window.tb.utils.staticPath("images/cart/addItem.svg"))
        }
        async firstUpdated() {
            this.counterInputElement.addEventListener("input", (()=>{
                this.counterInputElement.style.width = this.calculateCounterInputWidth(this.counterInputElement.value.length)
            }
            ))
        }
        render() {
            return U(Ct || (Ct = St`
            <li class="s-basket__item">
                ${0}
                <div class="s-basket__data">
                    <div class="s-basket__data-left">
                        <div class="s-basket__data-title sb-font-p2">${0}</div>
                        <div
                            class="s-basket__data-hint s-basket__data-hint_params ${0}"
                        >
                            ${0}
                        </div>
                        <div class="s-basket__data-hint s-basket__data-hint_hidden">
                            ${0}
                        </div>
                        ${0}
                        <span
                            role="alert"
                            aria-live="assertive"
                            class="s-basket__data-counter-warning ${0}"
                        >
                            ${0}
                        </span>
                    </div>
                    <div class="s-basket__data-right">
                        <div
                            class="s-basket__data-price sb-font-p2 ${0}"
                        >
                            <p class="price price_new">${0}</p>
                            <p class="price price_old">${0}</p>
                        </div>
                        <div
                            class="s-basket__data-summary ${0}"
                        >
                            <span class="price-per-unit">${0}</span>
                        </div>
                    </div>
                </div>
                <div class="s-basket__action">
                    <div
                        aria-label="Удалить товар"
                        role="button"
                        class="s-basket__remove-all-button sb-round-icon"
                        @click=${0}
                    >
                        <img src="${0}" alt="удалить все" />
                    </div>
                </div>
            </li>
        `), this.imageTemplate(), this.product.name, ft({
                [wt]: null === this.product.paramsList
            }), null !== this.product.paramsList ? this.product.paramsList : "", this.isOutOfStock ? "Нет в наличии" : "", this.counterTemplate(), ft({
                [wt]: !this.showQuantityOverflowWarning
            }), $t(this.counterWarningText), ft({
                [wt]: this.isOutOfStock,
                "s-basket__data-price_changed": this.product.hasNewPrice
            }), this.amount, this.product.hasNewPrice ? this.oldAmount : this.amount, ft({
                [wt]: this.isOutOfStock
            }), $t(this.productPricePerUnit), this.handleRemoveAllClick, window.tb.utils.staticPath("images/cart/removeAllItems.svg"))
        }
        createRenderRoot() {
            return this
        }
        handleDecrementClick() {
            this.canDecrement && (this.showQuantityOverflowWarning = !1,
            this.dispatchQuantityChanged(this.product.quantity - 1))
        }
        handleIncrementClick() {
            this.canIncrement && (this.showQuantityOverflowWarning = !1,
            this.dispatchQuantityChanged(this.product.quantity + 1))
        }
        handleCounterBlur() {
            const t = this.parseQuantityInputValue();
            if (t > this.product.maxQuantity)
                return this.counterInputValue = this.product.maxQuantity,
                this.dispatchQuantityChanged(this.product.maxQuantity),
                void (this.showQuantityOverflowWarning = !0);
            this.counterInputValue = t,
            this.dispatchQuantityChanged(t),
            this.showQuantityOverflowWarning = !1
        }
        handleCounterKeyUp(t) {
            switch (t.key) {
            case "Enter":
                const t = this.parseQuantityInputValue();
                this.dispatchQuantityChanged(t);
                break;
            case "Esc":
            case "Escape":
                this.dispatchQuantityChanged(this.product.quantity);
                break;
            default:
                return
            }
        }
        handleRemoveAllClick() {
            this.dispatchAllRemoved()
        }
        calculateCounterInputWidth(t) {
            return `${t + 1}ch`
        }
        parseQuantityInputValue() {
            const t = this.counterInputElement.value;
            if ("" === t || parseInt(t, 10) < 1)
                return this.product.quantity;
            return parseInt(t.replace(/\D+/g, ""), 10)
        }
        dispatchQuantityChanged(t) {
            this.dispatchEvent(new CustomEvent("quantitychanged",{
                detail: {
                    quantity: t
                }
            }))
        }
        dispatchAllRemoved() {
            this.dispatchEvent(new CustomEvent("allremoved"))
        }
    }
    ;
    var xt, Rt;
    Pt([(xt = "input#counter",
    at({
        descriptor: t=>{
            const e = {
                get() {
                    var t, e;
                    return null !== (e = null === (t = this.renderRoot) || void 0 === t ? void 0 : t.querySelector(xt)) && void 0 !== e ? e : null
                },
                enumerable: !0,
                configurable: !0
            };
            if (Rt) {
                const i = "symbol" == typeof t ? Symbol() : "__" + t;
                e.get = function() {
                    var t, e;
                    return void 0 === this[i] && (this[i] = null !== (e = null === (t = this.renderRoot) || void 0 === t ? void 0 : t.querySelector(xt)) && void 0 !== e ? e : null),
                    this[i]
                }
            }
            return e
        }
    }))], Ot.prototype, "counterInputElement", void 0),
    Pt([nt({
        attribute: !1
    })], Ot.prototype, "product", void 0),
    Pt([nt({
        attribute: !1
    })], Ot.prototype, "productPricePerUnit", null),
    Pt([rt()], Ot.prototype, "showQuantityOverflowWarning", void 0),
    Ot = Pt([st("cart-item")], Ot);
    let Lt, Tt, It, Ut, Ht = t=>t;
    var jt = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let Dt = class extends et {
        constructor() {
            super(...arguments),
            this.images = [],
            this.hasError = !1,
            this.isLoading = !1,
            this.goodsParams = [],
            this.disabled = !1
        }
        get button() {
            return this._button ? this._button : this._button = this.makeButton(this.disabled)
        }
        connectedCallback() {
            super.connectedCallback();
            const {goods: t=[], children: e=[], params: i=[]} = this.data;
            window.tb.utils.setQueryParameter("product", this.goodsId),
            this.goodsWithParams = e.filter((t=>t.parentId === this.goodsId)),
            this.goodsParams = i.filter((t=>t.goodsId === this.goodsId && t.values.length > 0)),
            this.currentProduct = t.find((t=>t.id === this.goodsId)) || {},
            this.areAllChildrenHidden = this.goodsWithParams.every((t=>t.isHidden)),
            this.hasChildren = !!this.goodsWithParams.length
        }
        render() {
            return this.disabled = this.goodsWithParams.length && this.areAllChildrenHidden || "0" === this.currentProduct.quantity,
            this.hasError ? this.errorTemplate : U(Lt || (Lt = Ht`
            <div
                class="popup-goods-params sb-text-dark ${0}"
            >
                <div class="popup-goods-params__image-wrapper js-goods-params-image-wrapper">
                    <product-slider .slides=${0} .showSkeleton=${0}></product-slider>
                </div>
                <div class="popup-goods-params__content">
                    <div class="sb-font-h5 sb-font-title sb-m-21-bottom js-goods-params-title sb-skeleton__title">
                        ${0}
                    </div>
                    <div
                        class="sb-font-p3 sb-text-opacity sb-m-19-bottom js-goods-params-description sb-skeleton__text"
                    >
                        ${0}
                    </div>
                    ${0}
                    ${0}
                    <product-selector
                        .params=${0}
                        .disabled=${0}
                        @onSelect="${0}"
                    ></product-selector>
                    ${0}
                </div>
            </div>
        `), ft({
                "sb-skeleton": this.isLoading
            }), this.slides, this.isLoading, this.currentProduct.title, this.currentProduct.description, this.hasChildren && !this.areAllChildrenHidden && this.selectedChildProduct ? U(Tt || (Tt = Ht`
                              <product-price .product=${0}></product-price>
                          `), this.selectedChildProduct) : j, this.hasChildren ? j : U(It || (It = Ht`
                              <product-price .product=${0}></product-price>
                          `), this.currentProduct), this.goodsParams, this.disabled, {
                handleEvent: t=>this.dispatchOnSelect(t.detail.id, t.detail.meta, t.detail.selectedParams)
            }, this.button)
        }
        get slides() {
            return [...this.firstImage ? [this.firstImage] : [], ...(this.firstImage ? this.images.filter((t=>{
                var e;
                return t.id !== (null === (e = this.firstImage) || void 0 === e ? void 0 : e.id)
            }
            )) : this.images).map((({id: t, preview: e})=>({
                id: t,
                src: e
            })))]
        }
        makeButton(t) {
            const e = document.createElement("button-with-loader");
            return e.disabled = t,
            e.title = t ? "Нет в наличии" : "Добавить в корзину",
            e.addEventListener("onClick", (()=>this.dispatchButtonClicked())),
            e
        }
        dispatchButtonClicked() {
            this.goodsWithParams.length ? this.selectedChildProduct && this.clickHandler(this.selectedChildProduct.id) : this.clickHandler(this.currentProduct.id)
        }
        get errorTemplate() {
            return U(Ut || (Ut = Ht`
            <div class="popup-error sb-text-dark">
                <div class="popup-error__container sb-align-center">
                    <div class="popup-error__icon sb-m-15-bottom">
                        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M47 0C72.9581 0 94 21.0442 94 47C94 72.9581 72.9581 94 47 94C21.0419 94 0 72.9581 0 47C0 21.0442 21.0419 0 47 0V0Z"
                                fill="#F5F5F6"
                            />
                            <path
                                d="M62.2977 36.2492C64.6722 33.4943 60.9097 29.7318 58.1548 32.1063L47 41.721L35.8462 32.1072C33.0914 29.7327 29.3289 33.4952 31.7034 36.2501L41.3172 47.4039L31.7033 58.5578C29.3288 61.3127 33.0913 65.0752 35.8462 62.7007L47 53.0869L58.1549 62.7016C60.9098 65.0761 64.6723 61.3136 62.2978 58.5587L52.6831 47.4039L62.2977 36.2492Z"
                                fill="#CBCFD3"
                            />
                        </svg>
                    </div>
                    <div class="sb-font-h5 sb-font-title sb-m-21-bottom">Что&mdash;то пошло не&nbsp;так</div>
                    <div class="sb-font-p3 sb-text-opacity">Попробуйте перезагрузить страницу</div>
                </div>
            </div>
        `))
        }
        createRenderRoot() {
            return this
        }
        clickHandler(t) {
            this.button.setLoading(),
            this.buttonAction(t, this.button.setFinishing.bind(this.button))
        }
        dispatchOnSelect(t, e, i) {
            this.selectedChildProduct = this.getSelectorAction(i, this.goodsParams, this.goodsWithParams, this.button)(t, e)
        }
    }
    ;
    jt([nt({
        attribute: !1
    })], Dt.prototype, "goodsId", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "data", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "firstImage", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "images", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "currentProduct", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "hasError", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "isLoading", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "getSelectorAction", void 0),
    jt([nt({
        attribute: !1
    })], Dt.prototype, "buttonAction", void 0),
    jt([rt()], Dt.prototype, "selectedChildProduct", void 0),
    Dt = jt([st("product-dialog")], Dt);
    let Mt, Nt, Ft = t=>t;
    var Wt = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let Bt = class extends et {
        constructor() {
            super(...arguments),
            this._isLoading = !1,
            this.isChecked = !1,
            this.isFinal = !1,
            this.animationDuration = 400
        }
        get isLoading() {
            return this._isLoading
        }
        setLoading() {
            this._isLoading = !0,
            this.disabled = !0
        }
        setFinishing(t) {
            t ? (this.isChecked = !0,
            setTimeout((()=>{
                setTimeout((()=>{
                    this.clean()
                }
                ), this.animationDuration),
                this.isFinal = !0
            }
            ), this.animationDuration)) : this.clean()
        }
        render() {
            return U(Mt || (Mt = Ft`
            <button
                ?disabled="${0}"
                class="sb-button-primary popup-goods-params__button sb-m-15-top js-goods-params-button sb-skeleton__button
                ${0}"
                @click="${0}"
            >
                ${0}
            </button>
        `), this.disabled, ft({
                "sb-button-adding-to-cart": this.isLoading,
                "sb-button-adding-to-cart_checked": this.isChecked,
                "sb-button-adding-to-cart_final": this.isFinal
            }), (()=>this.handleClick()), this.isLoading ? U(Nt || (Nt = Ft`
                          <div id="${0}" class="sb-button-adding-text">
                              ${0}
                          </div>
                          <div class="sb-button-adding-icon"></div>
                      `), "initial-text-content", this.title) : this.title)
        }
        createRenderRoot() {
            return this
        }
        clean() {
            this.isFinal = !1,
            this.isChecked = !1,
            this._isLoading = !1,
            this.disabled = this.postponedDisabled,
            this.postponedDisabled = !1
        }
        handleClick() {
            this.dispatchEvent(new CustomEvent("onClick"))
        }
    }
    ;
    var Qt, qt, Vt;
    Wt([nt({
        attribute: !1
    })], Bt.prototype, "title", void 0),
    Wt([nt({
        attribute: !1
    })], Bt.prototype, "disabled", void 0),
    Wt([nt({
        attribute: !1
    })], Bt.prototype, "postponedDisabled", void 0),
    Wt([rt()], Bt.prototype, "_isLoading", void 0),
    Wt([rt()], Bt.prototype, "isChecked", void 0),
    Wt([rt()], Bt.prototype, "isFinal", void 0),
    Bt = Wt([st("button-with-loader")], Bt),
    function(t) {
        t.Commodity = "commodity",
        t.Service = "service",
        t.Excise = "excise"
    }(Qt || (Qt = {})),
    function(t) {
        t.FullPayment = "full_payment",
        t.FullPrepayment = "full_prepayment"
    }(qt || (qt = {})),
    function(t) {
        t.Authorized = "AUTHORIZED",
        t.Reversed = "REVERSED",
        t.Confirmed = "CONFIRMED",
        t.PartialRefunded = "PARTIAL_REFUNDED",
        t.PartialReversed = "PARTIAL_REVERSED",
        t.Refunded = "REFUNDED",
        t.Rejected = "REJECTED"
    }(Vt || (Vt = {}));
    var zt, Xt, Kt, Zt, Gt, Jt, Yt, te, ee, ie, se, oe, ne;
    !function(t) {
        t.L = "L",
        t.M = "M",
        t.S = "S"
    }(zt || (zt = {})),
    function(t) {
        t.L = "l",
        t.M = "m",
        t.S = "s",
        t.XS = "xs"
    }(Xt || (Xt = {})),
    function(t) {
        t.P_1X1 = "1x1",
        t.P_4X3 = "4x3",
        t.P_3X4 = "3x4",
        t.P_3X2 = "3x2",
        t.P_2X3 = "2x3",
        t.P_9X16 = "9x16"
    }(Kt || (Kt = {})),
    function(t) {
        t.Youtube = "YOUTUBE",
        t.Vimeo = "VIMEO",
        t.Rutube = "RUTUBE"
    }(Zt || (Zt = {})),
    function(t) {
        t.PHOTO = "photo",
        t.IMAGE = "image",
        t.COLOR = "color",
        t.GRADIENT = "gradient",
        t.VIDEO = "video"
    }(Gt || (Gt = {})),
    function(t) {
        t.BLACK = "black",
        t.WHITE = "white",
        t.DEFAULT = "default"
    }(Jt || (Jt = {})),
    function(t) {
        t.BORDERED = "bordered",
        t.FILLED = "filled",
        t.LINK = "link"
    }(Yt || (Yt = {})),
    function(t) {
        t.S = "S",
        t.M = "M",
        t.L = "L",
        t.XL = "XL"
    }(te || (te = {})),
    function(t) {
        t.LOCAL = "local",
        t.EXTERNAL = "external",
        t.CART = "cart",
        t.POPUP = "popup",
        t.PHONE = "phone",
        t.EMAIL = "email",
        t.FILE = "file",
        t.POS = "pos"
    }(ee || (ee = {})),
    function(t) {
        t.h1 = "h1",
        t.h2 = "h2",
        t.h3 = "h3",
        t.h4 = "h4",
        t.h5 = "h5",
        t.p1 = "p1",
        t.p2 = "p2",
        t.p3 = "p3",
        t.p4 = "p4",
        t.d1 = "d1",
        t.d2 = "d2",
        t.d3 = "d3",
        t.d4 = "d4",
        t.d5 = "d5"
    }(ie || (ie = {})),
    function(t) {
        t.DAY = "day",
        t.WEEK = "week",
        t.MONTH = "month"
    }(se || (se = {})),
    function(t) {
        t.XS = "xs",
        t.S = "s",
        t.M = "m",
        t.L = "l"
    }(oe || (oe = {})),
    function(t) {
        t.EXTERNAL = "external",
        t.PHONE = "phone",
        t.EMAIL = "email"
    }(ne || (ne = {}));
    var re, ae;
    !function(t) {
        t.openRkoPopup = "openRkoPopup"
    }(re || (re = {})),
    function(t) {
        t.COLOR_SOLID = "color_solid",
        t.COLOR_GRADIENT = "color_gradient",
        t.PHOTO = "photo",
        t.ILLUSTRATION = "illustration",
        t.VIDEO = "video"
    }(ae || (ae = {}));
    let le, de = t=>t;
    var ce = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let ue = class extends et {
        constructor() {
            super(...arguments),
            this.slides = [],
            this.showSkeleton = !0
        }
        render() {
            return this.slider = window.tb.utils.createElement(this.sliderTemplate),
            window.tb.modules.slider.create(this.slider),
            U(le || (le = de`
            ${0}
        `), this.slider)
        }
        createRenderRoot() {
            return this
        }
        get sliderTemplate() {
            const t = this.slides.length ? this.slides.map((t=>this.makeImageTemplate(t.src))).join("") : this.makeImageTemplate();
            return `<div class="popup-goods-params__image js-goods-params-image">\n                    <div class="popup-goods-params__slider">\n                        <div class="popup-goods-params__slider-wrapper sb-skeleton__image">\n                            ${this.slides.length > 1 ? this.arrowBlock : ""}\n                            <div class="popup-goods-params__overlay"></div>\n                            <div class="popup-goods-params__list-wrapper js-list-wrapper">\n                                <ul class="popup-goods-params__list js-list">\n                                    ${t}\n                                </ul>\n                            </div>\n                        </div>\n                        <div class="popup-goods-params__dots sb-dots_scheme-white_inner sb-dots">\n                            ${!this.showSkeleton && this.slides.length > 1 ? this.dots : ""}\n                            ${this.showSkeleton ? this.dotsSkeletonTemplate : ""}\n                        </div>\n                    </div>\n                </div>`
        }
        get dots() {
            return '<ul class="sb-dots__dots-wrapper js-dots"></ul>'
        }
        get dotsSkeletonTemplate() {
            return '<ul class="sb-dots__dots-wrapper">\n                    <li class="sb-dots__wrapper popup-goods-params__dots_skeleton"><button class="sb-dots__dot" type="button"></button></li>\n                    <li class="sb-dots__wrapper popup-goods-params__dots_skeleton"><button class="sb-dots__dot" type="button"></button></li>\n                    <li class="sb-dots__wrapper popup-goods-params__dots_skeleton"><button class="sb-dots__dot" type="button"></button></li>\n                    <li class="sb-dots__wrapper popup-goods-params__dots_skeleton"><button class="sb-dots__dot" type="button"></button></li>\n                    <li class="sb-dots__wrapper popup-goods-params__dots_skeleton">\n                        <button class="sb-dots__dot sb-dots__dot_size_s" type="button"></button>\n                    </li>\n                </ul>'
        }
        get arrowBlock() {
            return `<div>\n                    ${this.makeArrowButton("previous")}\n                    ${this.makeArrowButton("next")}\n                </div>`
        }
        makeArrowButton(t) {
            return `\n            <div class="popup-goods-params__arrow\n                        popup-goods-params__arrow_${t}\n                        sb-text-dark js-arrow_${t} pointer-events-auto">\n                <button class="button-arrow button-arrow_white-arrow button-arrow_${t}">\n                <svg class="button-arrow-icon"\n                     width="12"\n                     height="13"\n                     viewBox="0 0 12 13"\n                     fill="none"\n                     xmlns="http://www.w3.org/2000/svg">\n                    <path fill-rule="evenodd"\n                          clip-rule="evenodd"\n                          d="M2.58225 6.20351C2.3685 6.41726 2.25 6.69851 2.25 6.99851C2.25 7.30076 2.3685 7.58351 2.58225 7.79501L7.707 12.7803C8.00325 13.0728 8.48175 13.0728 8.778 12.7803C9.07425 12.4878 9.07425 12.0123 8.778 11.7205L3.921 6.99851L8.778 2.27801C9.07425 1.98551 9.07425 1.51001 8.778 1.21676C8.48175 0.924258 8.00325 0.924259 7.707 1.21826L2.58225 6.20276L2.58225 6.20351Z"\n                          fill="currentColor"/>\n                </svg>\n                </button>\n            </div>\n        `
        }
        makeImageTemplate(t="https://business.cdn-tinkoff.ru/static/images/sales/image-placeholder.png") {
            return `<li class="popup-goods-params__slide js-slide">\n                    <div class="sb-image-square">\n                        <img\n                            alt="фото товара"\n                            src="${t}"\n                            class="popup-goods-params__image popup-goods-params__slide-image"\n                        />\n                    </div>\n                </li>`
        }
    }
    ;
    ce([nt()], ue.prototype, "slides", void 0),
    ce([nt()], ue.prototype, "showSkeleton", void 0),
    ue = ce([st("product-slider")], ue);
    let he, pe = t=>t;
    var ve = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let me = class extends et {
        render() {
            return U(he || (he = pe`
            <div class="popup-goods-params__prices">
                <div
                    class="popup-goods-params__price sb-font-h4 sb-font-title js-goods-params-price sb-skeleton__price"
                >
                    ${0}
                </div>
                <div
                    ?hidden="${0}"
                    class="popup-goods-params__old-price sb-font-p1 sb-text-additional js-goods-params-old-price"
                >
                    ${0}
                </div>
            </div>
        `), this.price, !this.needToShowOldPrice, this.priceOld)
        }
        createRenderRoot() {
            return this
        }
        get price() {
            var t;
            return (null !== (t = this.product.priceFull) && void 0 !== t ? t : this.product.price) ? `${window.tb.utils.numberWithSpaces(this.product.price)} ₽` : j
        }
        get priceOld() {
            var t;
            return (null !== (t = this.product.priceOldFull) && void 0 !== t ? t : this.product.priceOld) ? `${window.tb.utils.numberWithSpaces(this.product.priceOld)} ₽` : j
        }
        get needToShowOldPrice() {
            return !!this.product.priceOldFull || !!this.product.priceOld
        }
    }
    ;
    ve([nt()], me.prototype, "product", void 0),
    me = ve([st("product-price")], me);
    let be, _e, ge, fe, ye, $e, we = t=>t;
    var Ae = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let ke = class extends et {
        constructor() {
            super(...arguments),
            this.enableEcommCheckoutIntegration = !1,
            this.totalAmount = 0,
            this.minAmount = "",
            this.costForFree = "",
            this.visible = !1
        }
        render() {
            if (!this.visible)
                return U(be || (be = we`
                ${0}
            `), j);
            const t = window.tb.utils.numberWithSpaces(this.totalAmount);
            return U(_e || (_e = we`
            <div class="s-basket__footer">
                ${0} ${0}
                <div class="s-basket__summary">
                    <div class="s-basket__footer-text sb-font-p2">Итого</div>
                    <div class="s-basket__footer-price sb-font-h5 sb-font-title">
                        <span>${0}</span>
                        ₽
                    </div>
                </div>
                <button
                    type="button"
                    ?disabled="${0}"
                    class="sb-button-primary s-cart-modal__submit-button"
                    @click=${0}
                >
                    <span class="s-cart-modal__button-text">Оформить заказ</span>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="s-cart-modal__loader-icon">
                        <circle
                            cx="50"
                            cy="50"
                            r="50"
                            stroke-dasharray="314"
                            class="s-cart-modal__loader-circle"
                        ></circle>
                    </svg>
                </button>
                ${0} ${0}
            </div>
        `), this.minAmountTemplate, this.costForFreeTemplate, t, this.isCheckoutDisabled(), this.handleSubmit, this.ecommCheckoutTemplate, this.legalLinksTemplate)
        }
        createRenderRoot() {
            return this
        }
        get minAmountTemplate() {
            return this.minAmount ? U(ge || (ge = we`
                  <div class="s-basket__min-order-amount">
                      <div class="s-process-order__footer-text sb-font-p3 sb-text-opacity">
                          Доставляем заказы&nbsp;от
                          <span>${0}</span>
                          ₽
                      </div>
                  </div>
              `), this.minAmount) : ""
        }
        get costForFreeTemplate() {
            return this.costForFree ? U(fe || (fe = we`
                  <div ?hidden="${0}" class="s-basket__cost-for-free">
                      <div class="s-process-order__footer-text sb-font-p3 sb-text-opacity">
                          До&nbsp;бесплатной доставки осталось
                          <span>${0}</span>
                          ₽
                      </div>
                  </div>
              `), !this.costForFree, this.costForFree) : ""
        }
        get ecommCheckoutTemplate() {
            return this.enableEcommCheckoutIntegration ? U(ye || (ye = we`
                  <div class="s-basket__delimiter">
                      <span class="sb-font-p4 s-basket__delimiter-text sb-text-opacity">или</span>
                  </div>
                  <button
                      type="button"
                      ?disabled="${0}"
                      class="sb-button-secondary s-cart-modal__ecomm-checkout-button s-basket__ecomm-checkout"
                      @click=${0}
                  >
                      <span class="s-basket__ecomm-checkout-text">
                          <svg
                              width="17"
                              height="22"
                              viewBox="0 0 17 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="s-basket__ecomm-checkout-icon"
                          >
                              <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.6097 0.38572C11.2201 0.160521 10.6491 0.169027 10.259 0.588557C8.96852 1.97642 2.89537 8.52487 1.06295 10.83C0.35157 11.7249 1.06004 12.909 2.07551 12.909H6.32635L3.76158 20.1988C3.36293 21.3319 4.80959 22.1926 5.61515 21.3017L15.7885 10.0506C16.5443 9.21468 15.9511 7.87868 14.8242 7.87868H10.6701L12.1315 1.59089C12.2525 1.07042 11.9877 0.604218 11.6097 0.38572Z"
                                  fill="#333333"
                              />
                          </svg>
                          Быстрый заказ
                      </span>
                  </button>
              `), this.isCheckoutDisabled(), this.handleCheckout) : ""
        }
        get legalLinksTemplate() {
            var t, e, i, s;
            return U($e || ($e = we`
            <div class="sb-font-p4 s-basket__footer-legal-links">
                Нажимая на&nbsp;кнопку, я&nbsp;даю согласие
                <a id="offer-link" href="${0}" class="sb-link">с&nbsp;офертой</a>
                и
                <a id="policy-link" href="${0}" class="sb-link">
                    политикой конфиденциальности
                </a>
            </div>
        `), null !== (e = null === (t = this.legalLinks) || void 0 === t ? void 0 : t.offerLink) && void 0 !== e ? e : "#", null !== (s = null === (i = this.legalLinks) || void 0 === i ? void 0 : i.privacyLink) && void 0 !== s ? s : "#")
        }
        handleSubmit() {
            this.submitHandler()
        }
        handleCheckout() {
            this.checkoutHandler()
        }
        isCheckoutDisabled() {
            return 0 === this.totalAmount || "all_goods_are_out" === this.productsState
        }
    }
    ;
    Ae([nt({
        attribute: !1
    })], ke.prototype, "enableEcommCheckoutIntegration", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "totalAmount", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "productsState", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "minAmount", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "costForFree", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "visible", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "submitHandler", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "checkoutHandler", void 0),
    Ae([nt({
        attribute: !1
    })], ke.prototype, "legalLinks", void 0),
    ke = Ae([st("step-info-footer")], ke);
    let Ee, Ce = t=>t;
    var Se = function(t, e, i, s) {
        var o, n = arguments.length, r = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            r = Reflect.decorate(t, e, i, s);
        else
            for (var a = t.length - 1; a >= 0; a--)
                (o = t[a]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
        return n > 3 && r && Object.defineProperty(e, i, r),
        r
    };
    let Pe = class extends et {
        constructor() {
            super(),
            this.disabled = !1,
            this.params = [],
            this.selectedParams = [],
            this.container = document.createElement("div"),
            this.container.classList.add("js-goods-params-selects")
        }
        connectedCallback() {
            super.connectedCallback(),
            this.disabled || this.makeSelector()
        }
        makeSelector() {
            this.params.forEach((t=>{
                const e = document.createElement("div");
                e.classList.add("popup-goods-params__select", "sb-m-19-top", "js-goods-params-select", "sb-skeleton__field"),
                this.container.appendChild(e),
                window.tb.modules.select.create(e, {
                    type: "select",
                    name: t.title || "Параметр",
                    list: t.values.map((t=>({
                        id: t.id,
                        text: t.title
                    }))),
                    initial: t.values[0].title,
                    meta: {
                        paramId: t.id
                    }
                }, null, this.onSelect.bind(this))
            }
            ))
        }
        onSelect(t, e, i) {
            this.dispatchEvent(new CustomEvent("onSelect",{
                detail: {
                    id: e,
                    meta: i,
                    selectedParams: this.selectedParams
                }
            }))
        }
        render() {
            return U(Ee || (Ee = Ce`
            ${0}
        `), this.container)
        }
        createRenderRoot() {
            return this
        }
    }
    ;
    Se([nt()], Pe.prototype, "disabled", void 0),
    Se([nt()], Pe.prototype, "params", void 0),
    Se([rt()], Pe.prototype, "selectedParams", void 0),
    Pe = Se([st("product-selector")], Pe)
}
]);
