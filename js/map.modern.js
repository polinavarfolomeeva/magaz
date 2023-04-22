!function(t) {
    var e = {};
    function o(n) {
        if (e[n])
            return e[n].exports;
        var a = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, o),
        a.l = !0,
        a.exports
    }
    o.m = t,
    o.c = e,
    o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }
    ,
    o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(t, e) {
        if (1 & e && (t = o(t)),
        8 & e)
            return t;
        if (4 & e && "object" == typeof t && t && t.__esModule)
            return t;
        var n = Object.create(null);
        if (o.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }),
        2 & e && "string" != typeof t)
            for (var a in t)
                o.d(n, a, function(e) {
                    return t[e]
                }
                .bind(null, a));
        return n
    }
    ,
    o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return o.d(e, "a", e),
        e
    }
    ,
    o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    o.p = "",
    o(o.s = 0)
}([function(t, e, o) {
    "use strict";
    o.r(e);
    const n = window.tb;
    class a {
        constructor() {
            this.state = "down",
            this.mapData = []
        }
        registerMapData(t) {
            const e = Object.assign({
                offsetHorizontal: 0,
                offsetVertical: 0,
                disableScroll: !1
            }, t.options || {});
            this.mapData.push(Object.assign(Object.assign({}, t), {
                options: e
            })),
            this.processQueue()
        }
        init() {
            "down" === this.state && (this.state = "loading",
            n.utils.loadScript({
                src: a.apiSrc
            }, (()=>{
                this.ymap = window.ymaps,
                this.ymap.ready({
                    successCallback: ()=>{
                        this.state = "ready",
                        this.processQueue()
                    }
                })
            }
            )))
        }
        processQueue() {
            if ("ready" === this.state) {
                for (const t of this.mapData)
                    this.initMapComponent(t);
                this.mapData = []
            } else
                "down" === this.state && this.init()
        }
        adjustMapCenter(t, e, o, n) {
            let a = t.getGlobalPixelCenter(e);
            return a = [a[0] + o, a[1] + n],
            t.options.get("projection").fromGlobalPixels(a, t.getZoom())
        }
        initMapComponent(t) {
            const e = t.data && t.data.markers && t.data.markers.length ? t.data.markers[0] : null
              , o = new this.ymap.Map(t.element,{
                center: e ? e.coords : [55.76, 37.64],
                zoom: 16
            });
            if (e) {
                o.setCenter(t.options.offsetHorizontal || t.options.offsetVertical ? this.adjustMapCenter(o, e.coords, t.options.offsetHorizontal, t.options.offsetVertical) : e.coords);
                const n = new this.ymap.Placemark(e.coords,{
                    iconContent: e.name,
                    balloonContentHeader: e.name,
                    balloonContentBody: e.description
                },{
                    preset: "islands#blueStretchyIcon"
                });
                o.geoObjects.add(n)
            }
            t.options.disableScroll && o.behaviors.disable("scrollZoom");
            const n = window;
            ("ontouchstart"in n || n.DocumentTouch && document instanceof n.DocumentTouch || navigator.maxTouchPoints > 0 || n.navigator.msMaxTouchPoints > 0) && o.behaviors.disable("drag")
        }
    }
    a.apiSrc = "21" + (n.config.yandexMapsApiKey ? `&apikey=${n.config.yandexMapsApiKey}` : "");
    const s = new a;
    window.tbMap = {
        create: (t,e,o)=>{
            s.registerMapData({
                element: t,
                data: e,
                options: o
            })
        }
    }
}
]);
