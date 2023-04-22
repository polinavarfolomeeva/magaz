!function(e) {
    var t = {};
    function s(i) {
        if (t[i])
            return t[i].exports;
        var o = t[i] = {
            i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, s),
        o.l = !0,
        o.exports
    }
    s.m = e,
    s.c = t,
    s.d = function(e, t, i) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }
    ,
    s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    s.t = function(e, t) {
        if (1 & t && (e = s(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var i = Object.create(null);
        if (s.r(i),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var o in e)
                s.d(i, o, function(t) {
                    return e[t]
                }
                .bind(null, o));
        return i
    }
    ,
    s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return s.d(t, "a", t),
        t
    }
    ,
    s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    s.p = "",
    s(s.s = 0)
}([function(e, t, s) {
    "use strict";
    s.r(t);
    const i = window.tb
      , o = i.utils.select
      , r = "cart-x-products"
      , n = "cart-x-state"
      , a = "cart-x-order"
      , d = {
        no_goods: "Товары закончились",
        no_some_goods: "Часть товаров закончилась",
        goods_price_changed: "На часть товаров изменились цены",
        no_some_goods_price_changed: "Часть товаров закончилась, на что-то изменились цены",
        quantity_changed: "Пока формировался заказ, количество одного из товаров изменилось. В корзине осталось доступное количество ",
        goods_are_out: "Пока формировался заказ, часть товаров закончилась",
        all_goods_are_out: "Пока формировался заказ, все товары закончились",
        ecomm_checkout_request_failure: "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже",
        order_creation_failed: "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже"
    };
    const c = new class {
        constructor() {
            this.initialProductsState = "not_checked",
            this._products = [],
            this._amount = 0,
            this._checkoutResponse = null,
            this._checkoutData = null,
            this._createdOrderId = null,
            this.result = null,
            this.fixed = !1,
            this.productsState = this.initialProductsState,
            this.minOrderAmount = 0,
            this.costForFree = 0,
            this.deliveryState = {
                value: null,
                submitEnabled: !0
            },
            this.updateProducts(i.localStorage.get(r) || []),
            this.updateCheckoutData(i.localStorage.get(n)),
            this._createdOrderId = i.localStorage.get(a)
        }
        get products() {
            return this._products
        }
        get checkout() {
            return this._checkoutResponse || {
                fields: [],
                offerLink: null,
                privacyLink: null,
                paymentMethods: null,
                deliveryLink: null,
                deliveryDescription: null,
                amount: null,
                promocode: null,
                deliveries: null
            }
        }
        set checkout(e) {
            this._checkoutResponse = {
                fields: e.fields || [],
                offerLink: e.offerLink || "",
                privacyLink: e.privacyLink || "",
                paymentMethods: e.paymentMethods || [],
                deliveryLink: e.deliveryLink || "",
                deliveryDescription: e.deliveryDescription || "",
                amount: e.amount,
                promocode: e.promocode || null,
                deliveries: e.deliveries || []
            }
        }
        get checkoutData() {
            return this._checkoutData || {
                fields: [],
                paymentMethod: null,
                promocode: null
            }
        }
        get totalAmount() {
            return this._amount
        }
        get createdOrderId() {
            return this._createdOrderId
        }
        set createdOrderId(e) {
            this._createdOrderId = e,
            e ? i.localStorage.set(a, e) : i.localStorage.remove(a)
        }
        productAdd(e) {
            if (this.fixed)
                return;
            const {products: t} = this;
            t.push(e),
            this.updateProducts(t),
            this.deliveryState = {
                value: null,
                submitEnabled: !0
            }
        }
        productChange(e, t, s) {
            if (this.fixed)
                return;
            let {products: i} = this;
            const o = i.find((t=>t.id === e));
            if (o) {
                switch (t) {
                case 0:
                    if (o.quantity === o.maxQuantity)
                        return;
                    o.quantity += 1,
                    o.hasNewPrice = !1,
                    this.deliveryState = null;
                    break;
                case 1:
                    1 !== o.quantity && (o.quantity -= 1,
                    o.hasNewPrice = !1);
                    break;
                case 2:
                    i = this.products.filter((t=>t.id !== e));
                    break;
                case 3:
                    o.quantity = (null == s ? void 0 : s.quantity) || 0,
                    o.amount = o.price * o.quantity,
                    o.hasNewPrice = !1
                }
                this.updateProducts(i)
            }
        }
        productsClear() {
            this.fixed = !1,
            this.updateProducts([])
        }
        updateCheckoutData(e) {
            this._checkoutData = Object.assign(Object.assign({
                fields: [],
                paymentMethod: null,
                promocode: null
            }, this._checkoutData || {}), e || {}),
            i.localStorage.set(n, this._checkoutData)
        }
        setProducts(e=[]) {
            const t = this.processProducts(e);
            this.updateProducts(t)
        }
        updateProducts(e) {
            this._products = (e || []).map((e=>Object.assign(Object.assign({}, e), {
                amount: e.quantity * e.price
            }))),
            this._amount = this._products.reduce(((e,t)=>e + (t.isHidden ? 0 : t.amount)), 0),
            e && e.length ? i.localStorage.set(r, e) : i.localStorage.remove(r)
        }
        resetProductsState() {
            this.productsState = this.initialProductsState
        }
        sortProducts(e) {
            const t = s=>{
                if (0 === s.length)
                    return 0;
                const i = e.findIndex(s.shift());
                return -1 === i ? t(s) : i
            }
              , s = new Array(e.length);
            for (let i = 0; i < s.length; i++) {
                const o = t([e=>e.hasNewPrice, e=>e.isHidden]);
                s[i] = e[o],
                e.splice(o, 1)
            }
            return s
        }
        processProducts(e) {
            return 0 === this._products.length ? this.sortProducts(e) : this.sortProducts(this._products.map((t=>{
                const s = e.find((e=>e.id === t.id));
                return s || Object.assign(Object.assign({}, t), {
                    isHidden: !0
                })
            }
            )))
        }
    }
      , l = 9999999;
    var p;
    !function(e) {
        e.Online = "online",
        e.OnDelivery = "onDelivery",
        e.CardOnDelivery = "cardOnDelivery"
    }(p || (p = {}));
    const u = new class {
        checkout(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/checkout",
                body: Object.assign({
                    hash: i.config.cartHash
                }, e),
                onSuccess: t,
                onError: s
            })
        }
        confirm(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/confirm",
                body: Object.assign({
                    hash: i.config.cartHash
                }, e),
                onSuccess: t,
                onError: s
            })
        }
        products(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/products",
                body: {
                    hash: i.config.cartHash,
                    products: e
                },
                onSuccess: t,
                onError: s
            })
        }
        status(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/status",
                body: {
                    hash: i.config.cartHash,
                    orderId: e
                },
                onSuccess: t,
                onError: s
            })
        }
        promocode(e, t, s, o) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/promocode",
                body: {
                    hash: i.config.cartHash,
                    products: e,
                    promocode: t
                },
                onSuccess: s,
                onError: o
            })
        }
        check(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/check",
                body: {
                    hash: i.config.cartHash,
                    products: e
                },
                onSuccess: t,
                onError: e=>{
                    s(e && e.data || {
                        code: "",
                        goods: []
                    })
                }
            })
        }
        address(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/address",
                body: e,
                onSuccess: t,
                onError: s
            })
        }
        fetchProductData(e, t, s) {
            i.api.request({
                method: "GET",
                url: `/api/v2/goods/product-info?id=${e}`,
                onSuccess: t,
                onError: s
            })
        }
        fetchLegalLinks(e, t, s) {
            i.api.request({
                method: "POST",
                url: "/api/v2/cart4/legal-links",
                body: e,
                onSuccess: t,
                onError: s
            })
        }
    }
      , h = {}
      , m = {
        [p.CardOnDelivery]: "Картой при получении",
        [p.OnDelivery]: "Наличными при получении",
        [p.Online]: "Онлайн"
    };
    function y(e, t) {
        return i.utils.createElement(function(e, t) {
            const s = h[e];
            return s ? s(t) : ""
        }(e, t).trim())
    }
    h.wrapper = ()=>`\n<div class="s-cart-modal" id="cart-x" style="display: none;">\n    <div class="s-cart-modal__background"></div>\n    <div tabindex="0"></div>\n    <div class="s-cart-modal__content sb-element-white" role="dialog" aria-modal="true" >\n        <span class="s-cart-modal__overlay"></span>\n\n        <div class="s-cart-modal__close sb-round-icon" aria-label="Закрыть корзину" role="button">\n            <img src="${i.utils.staticPath("images/cart/close.svg")}" alt="х" />\n        </div>\n    </div>\n    <div tabindex="0"></div>\n</div>\n`,
    h["step-info"] = ()=>'\n<div class="s-basket">\n    <div class="s-basket__header">\n        <div class="s-basket__header-title sb-font-h4 sb-font-title">Корзина</div>\n    </div>\n    <div class="s-basket__container">\n        <div class="s-basket__notification sb-hidden">\n            <div class="s-basket__notification-wrapper">\n                <span class="s-basket__notification-line"></span>\n                <div class="s-basket__notification-content">\n                    <span class="s-basket__notification-text"></span>\n                    <div class="s-basket__notification-button sb-hidden">\n                        <button class="s-basket__clear-button" type="button">Очистить корзину</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <ul class="s-basket__list"></ul>\n        <div class="s-basket__empty" style="display: none;">\n            <svg class="s-basket__empty-icon" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60Z" fill="#F5F5F6"/>\n                <path d="M75.5596 51.1571L62.6422 32.1518C62.0549 31.5759 61.1743 31 60.2936 31C59.4128 31 58.5321 31.288 57.945 32.1518L45.0275 51.1571H30.9358C29.1743 51.1571 28 52.3089 28 54.0366C28 54.3246 28 54.6126 28 54.9005L35.3394 81.6806C35.9266 83.9843 38.2752 86 40.9174 86H79.0826C81.7248 86 84.0734 84.2723 84.6606 81.6806L92 54.9005C92 54.6126 92 54.3246 92 54.0366C92 52.3089 90.8257 51.1571 89.0642 51.1571H75.5596ZM51.4862 51.1571L60.2936 38.4869L69.1009 51.1571H51.4862Z" fill="#C7C9CC"/>\n            </svg>\n            <div class="s-basket__empty-title">\n                В&nbsp;корзине пока ничего нет\n            </div>\n            <div class="s-basket__empty-description">\n                Чтобы оформить заказ, добавьте сюда товары или услуги\n            </div>\n            <div class="s-basket__empty-link">\n                Перейти к&nbsp;покупкам\n            </div>\n        </div>\n    </div>\n</div>\n',
    h["info-product"] = ()=>`\n<li class="s-basket__item">\n    <div class="s-basket__item-image-wrapper">\n        <div class="s-basket__item-image">\n            <div class="sb-image-square"></div>\n        </div>\n    </div>\n    <div class="s-basket__data">\n        <div class="s-basket__data-left">\n            <div class="s-basket__data-title sb-font-p2"></div>\n            <div class="s-basket__data-hint s-basket__data-hint_params" style="display: none;"></div>\n            <div class="s-basket__data-hint s-basket__data-hint_hidden"></div>\n            <div class="s-basket__data-counter">\n                <div class="s-basket__data-counter-button s-basket__data-counter-button_minus" aria-label="Уменьшить количество товара" role="button">\n                    <div class="sb-round-icon sb-round-icon_minus">\n                        <img src="${i.utils.staticPath("images/cart/removeItem.svg")}" alt="-" />\n                    </div>\n                </div>\n                <input type="number" min="1" max="9999999" step="1" class="s-basket__data-counter-number sb-font-p2" aria-label="Количество товара"/>\n                <div class="s-basket__data-counter-button s-basket__data-counter-button_plus" aria-label="Добавить количество товара" role="button">\n                    <div class="sb-round-icon sb-round-icon_plus">\n                        <img src="${i.utils.staticPath("images/cart/addItem.svg")}" alt="+" />\n                    </div>\n                </div>\n            </div>\n            <span class="s-basket__data-counter-warning sb-hidden" role="alert" aria-live="assertive"></span>\n        </div>\n        <div class="s-basket__data-right">\n            <div class="s-basket__data-price sb-font-p2">\n                <p class="price price_new"></p>\n                <p class="price price_old"></p>\n            </div>\n            <div class="s-basket__data-summary">\n                <span class="price-per-unit"></span>\n            </div>\n        </div>\n    </div>\n    <div class="s-basket__action">\n        <div class="s-basket__remove-all-button sb-round-icon" aria-label="Удалить товар" role="button"><img src="${i.utils.staticPath("images/cart/removeAllItems.svg")}" alt="удалить все" /></div>\n    </div>\n</li>\n`,
    h["info-loader"] = ()=>'\n<div class="s-basket__loading s-cart-modal_is-loading">\n    <svg class="s-cart-modal__loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n        <circle class="s-cart-modal__loader-circle" cx="50" cy="50" r="50" stroke-dasharray="314"></circle>\n    </svg>\n</div>\n',
    h["delivery-option-details"] = e=>{
        let t = "";
        if ("self" === e.type) {
            t = `${e.address ? `<div class="s-process-order__text">Адрес: ${e.address}</div>` : ""}\n                ${e.hours ? `<div class="s-process-order__text">Время работы: ${e.hours}</div>` : ""}\n                ${e.comment ? `<div class="s-process-order__text">Как добраться: ${e.comment}</div>` : ""}`
        }
        return `<div class="s-process-order__option-details sb-font-p3 sb-text-opacity">\n                ${t}\n                ${e.period ? `<div class="s-process-order__text">Срок доставки: ${e.period}</div>` : ""}\n            </div>`
    }
    ,
    h["step-checkout"] = ()=>`\n<form class="s-process-order sb-element-white">\n    <div class="s-process-order__header">\n        <div class="s-process-order__header-wrapper">\n            <div class="s-process-order__back sb-round-icon" aria-label="Назад" role="button"><img src="${i.utils.staticPath("images/cart/back.svg")}" alt="<" /></div>\n            <div class="s-process-order__header-title sb-font-h4 sb-font-title">Оформление заказа</div>\n        </div>\n    </div>\n    <div class="s-process-order__container">\n        <div class="s-process-order__list s-process-order__fields">\n            <div class="s-process-order__title sb-font-h5 sb-font-title">Контактные данные</div>\n            <div class="s-process-order__row"></div>\n        </div>\n        <div class="s-process-order__list s-process-order__delivery" style="display: none;">\n            <div class="s-process-order__title sb-font-h5 sb-font-title">Доставка</div>\n            <div class="s-process-order__description s-process-order__text sb-font-p3 sb-text-opacity"></div>\n            <div class="sb-font-p4 s-process-order__link sb-text-opacity" style="display: none;">\n                <a target="_blank" class="sb-link" href="">Подробнее о доставке</a>\n            </div>\n            <div class="s-process-order__address-container s-process-order__row"></div>\n            <div class="s-process-order__radio-container s-process-order__row"></div>\n            <div class="s-process-order__address-select s-process-order__row"></div>\n        </div>\n        <div class="s-process-order__list s-process-order__payment" style="display: none;">\n            <div class="s-process-order__title sb-font-h5 sb-font-title">Оплата</div>\n            <div class="s-process-order__row"></div>\n        </div>\n        <div class="s-process-order__list s-process-order__promocode" style="display: none;">\n            <div class="s-process-order__title sb-font-h5 sb-font-title">Промокод</div>\n            <div class="s-process-order__row"></div>\n            <svg class="s-cart-modal__loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n                <circle class="s-cart-modal__loader-circle" cx="50" cy="50" r="50" stroke-dasharray="314"></circle>\n            </svg>\n        </div>\n    </div>\n    <div class="s-process-order__footer">\n        <div class="s-process-order__amount" style="display: none;">\n            <div class="s-process-order__footer-text sb-font-p3 sb-text-opacity">Сумма заказа</div>\n            <div class="s-process-order__footer-price sb-font-p3 sb-text-opacity">\n                <span></span> ₽\n            </div>\n        </div>\n        <div class="s-process-order__delivery-amount" style="display: none;">\n            <div class="s-process-order__footer-text sb-font-p3 sb-text-opacity">Доставка</div>\n            <div class="s-process-order__footer-price sb-font-p3 sb-text-opacity">\n                <span></span>\n            </div>\n        </div>\n        <div class="s-process-order__summary">\n            <div class="s-process-order__footer-text sb-font-p2">Итого</div>\n            <div class="s-process-order__footer-price sb-font-h4 sb-font-title">\n                <span class="s-process-order__before-discount sb-crossed"></span>\n                <span class="s-process-order__after-discount">0</span> ₽\n            </div>\n        </div>\n        <button type="submit" class="sb-button-primary s-cart-modal__submit-button">\n            <span class="s-cart-modal__button-text">Подтвердить заказ</span>\n            <svg class="s-cart-modal__loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n                <circle class="s-cart-modal__loader-circle" cx="50" cy="50" r="50" stroke-dasharray="314"></circle>\n            </svg>\n        </button>\n    </div>\n</form>\n`,
    h["checkout-field-error"] = e=>`\n<div class="s-process-order__status s-process-order__status_error sb-font-p3" style="display: none;">${e}</div>\n`,
    h["product-categories-error-expand"] = e=>{
        const {text: t, items: s} = e
          , i = s.slice(0, 3)
          , o = s.slice(3)
          , r = e.items.length > 1 ? "товары" : "товар"
          , n = e.items.length > 3 ? '<span class="s-process-order__expand-button s-process-order__expand_opened sb-link sb-text-opacity">Показать все товары</span>' : ""
          , a = e=>{
            let t = "";
            return e.forEach((e=>{
                t += `<div class="s-process-order__expand-item">— ${e}</div>`
            }
            )),
            t
        }
        ;
        return `<div class="s-process-order__expand">\n                <div class="s-process-order__status s-process-order__status_error sb-font-p3">\n                    <div class="s-process-order__expand-status">\n                        Для ${t} <span class="s-process-order__remove-goods sb-link">удалите</span> ${r} из корзины\n                    </div>\n                    <div class="s-process-order__expand-content">\n                        ${a(i)}\n                        <div class="s-process-order__expand-cut">${a(o)}</div>\n                    </div>\n                </div>\n                ${n}\n                <svg class="s-cart-modal__loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n                    <circle class="s-cart-modal__loader-circle" cx="50" cy="50" r="50" stroke-dasharray="314"></circle>\n                </svg>\n            </div>`
    }
    ,
    h["checkout-field"] = e=>`\n<div class="s-process-order__col">\n    ${(e=>{
        switch (e.type) {
        case "textarea":
            return `<div class="sb-textarea s-process-order__textarea" data-validated="true">\n                        <label class="sb-textarea__wrapper">\n                            <textarea class="sb-textarea__field"\n                                      name="${e.id}"\n                                      id="${e.id}"></textarea>\n                            <span class="sb-textarea__placeholder"></span>\n                            <div class="sb-textarea__content"></div>\n                        </label>\n                        <div class="sb-textarea__error"></div>\n                    </div>`;
        default:
            return `<div class="sb-input s-process-order__input" data-validated="true">\n                        <label class="sb-input__wrapper">\n                            <input class="sb-input__field"\n                                   type="${"phone" === e.type ? "tel" : e.type}"\n                                   name="${e.id}"\n                                   id="${e.id}"\n                                   value=""\n                                    ${"phone" === e.type && (i.config.forcePhoneInputMask || e.isMaskEnabled) ? 'data-mask-enabled="true" minlength="16" maxlength="16"' : ""}>\n                            <span class="sb-input__placeholder"></span>\n                        </label>\n                        <div class="sb-input__error"></div>\n                    </div>`
        }
    }
    )(e)}\n</div>\n`,
    h["checkout-select"] = ()=>'\n<div class="s-process-order__col s-process-order__col_full-width"></div>\n',
    h["checkout-payment"] = e=>`\n<div class="s-process-order__col s-process-order__radio-boxed">\n    <div class="sb-radio-boxed">\n        <input id="payment-${e}" type="radio" name="payment" value="${e}">\n        <label class="sb-radio-boxed__label" for="payment-${e}" role="radio">${m[e]}</label>\n    </div>\n</div>\n`,
    h["checkout-delivery"] = e=>`\n<div class="s-process-order__col s-process-order__radio-boxed">\n    <div class="sb-radio-boxed">\n        <input id="delivery-${e.id}" type="radio" name="delivery" value="${e.id}">\n        <label class="sb-radio-boxed__label" for="delivery-${e.id}" role="radio">${e.title}</label>\n    </div>\n</div>\n`,
    h["promocode-field"] = e=>`\n<div class="s-process-order__col s-process-order__col_full-width">\n    <div class="sb-input sb-input_active s-process-order__input">\n        <label class="sb-input__wrapper">\n            <input class="sb-input__field"\n                   type="text"\n                   name="promocode"\n                   value="${e}">\n            <span class="sb-input__placeholder">Кодовое слово</span>\n            <button class="s-process-order__promocode-apply" style="display: none;">\n                Применить\n            </button>\n            <button class="s-process-order__promocode-clear" style="display: none;">\n                Удалить\n            </button>\n        </label>\n        <span class="sb-input__status"></span>\n    </div>\n</div>\n`,
    h["step-result"] = ()=>`\n<div class="s-order-processed sb-element-white">\n    <div class="s-order-processed__container">\n        <div class="s-order-processed__list s-order-processed__list-loader">\n            <div class="s-basket__loading s-cart-modal_is-loading">\n                <svg class="s-cart-modal__loader-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n                    <circle class="s-cart-modal__loader-circle" cx="50" cy="50" r="50" stroke-dasharray="314"></circle>\n                </svg>\n            </div>\n        </div>\n        <div class="s-order-processed__list s-order-processed__list-result" style="display: none">\n            <div class="s-order-processed__icon">\n                <img src="${i.utils.staticPath("images/cart/success.svg")}" class="s-order-processed__icon-success" alt="OK" style="display:none;" />\n                <img src="${i.utils.staticPath("images/cart/fail.svg")}" class="s-order-processed__icon-fail" alt="ошибка" style="display:none;" />\n            </div>\n            <div class="s-order-processed__title sb-font-h5">\n                <span class="order"></span> <br>\n                <span class="title"></span>\n            </div>\n            <div class="s-order-processed__description sb-font-p3"></div>\n        </div>\n    </div>\n    <div class="s-order-processed__footer">\n        <button class="s-order-processed__deactivate sb-button-primary" type="button">Закрыть корзину</button>\n    </div>\n</div>\n`;
    var v = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , _ = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    const f = "s-cart-modal_is-open"
      , b = "s-cart-modal_is-closing";
    class g {
        constructor() {
            this.isShown = !1,
            this.root = y("wrapper"),
            document.body.appendChild(this.root);
            const e = ()=>{
                c.resetProductsState(),
                this.show(!1)
            }
            ;
            this.closeElement.addEventListener("click", e),
            this.backgroundElement.addEventListener("click", e),
            window.addEventListener("keydown", (t=>{
                27 === t.keyCode && e()
            }
            ))
        }
        show(e=!0) {
            if (this.isShown !== e) {
                if (this.isShown = e,
                window.dispatchEvent(new CustomEvent("needUpdateOffset")),
                !e)
                    return this.root.classList.add(b),
                    this.root.classList.remove(f),
                    document.body.style.overflow = "visible",
                    this.ariaAccessibility("false", "0"),
                    setTimeout((()=>{
                        this.root && (this.root.style.display = "none")
                    }
                    ), 400),
                    void this.updateVisibility(!1);
                this.root.classList.add(f),
                this.root.classList.remove(b),
                this.root.style.display = "block",
                document.body.style.overflow = "hidden",
                this.ariaAccessibility("true", "-1"),
                this.updateVisibility(!0)
            }
        }
        ariaAccessibility(e, t) {
            [".site-wrapper", ".s-footer", ".s-cart"].forEach((s=>{
                const i = document.querySelector(s);
                null == i || i.setAttribute("aria-hidden", e),
                null == i || i.setAttribute("tabindex", t)
            }
            ))
        }
        addStep(e) {
            this.contentElement.appendChild(e.root)
        }
        updateVisibility(e) {
            this.onVisibilityChange && setTimeout((()=>this.onVisibilityChange(e)), 0)
        }
    }
    var E, S, C, L, k, O, P, x, A, w, T, M, D;
    v([o(".s-cart-modal__close"), _("design:type", HTMLElement)], g.prototype, "closeElement", void 0),
    v([o(".s-cart-modal__background"), _("design:type", HTMLElement)], g.prototype, "backgroundElement", void 0),
    v([o(".s-cart-modal__content"), _("design:type", HTMLElement)], g.prototype, "contentElement", void 0),
    function(e) {
        e.NoPaymentMethod = "no_payment_method",
        e.ObsoleteTotalAmount = "obsolete_total_amount",
        e.NoTotalAmount = "no_total_amount",
        e.NoDelivery = "no_delivery",
        e.NoDeliveryConditions = "no_delivery_conditions",
        e.NoGoods = "no_goods",
        e.NoPromo = "no_promo",
        e.GoodsChanged = "goods_changed",
        e.GoodsAreOut = "goods_are_out",
        e.AllGoodsAreOut = "all_goods_are_out",
        e.IncorrectQuantity = "incorrect_quantity",
        e.QuantityChanged = "quantity_changed",
        e.Failed = "failed",
        e.NoMarketGoods = "no_market_goods",
        e.NoSelectedGoods = "no_selected_goods",
        e.NoContacts = "no_phone_or_email",
        e.EcommCheckoutRequestFailure = "EcommCheckoutRequestFailure"
    }(E || (E = {})),
    function(e) {
        e.Active = "Active",
        e.Blocked = "Blocked"
    }(S || (S = {})),
    function(e) {
        e.CartAddToCart = "AddToCart",
        e.CartOrderProcess = "OrderProcess",
        e.CartOrderConfirm = "OrderConfirm",
        e.CartPurchaseSuccess = "PurchaseSuccess",
        e.CartEcommCheckout = "EcommCheckout"
    }(C || (C = {})),
    function(e) {
        e.Online = "Online",
        e.Offline = "Offline"
    }(L || (L = {})),
    function(e) {
        e.Name = "name",
        e.Phone = "phone",
        e.Email = "email",
        e.Text = "text",
        e.TextArea = "textarea"
    }(k || (k = {})),
    function(e) {
        e.APPROVED = "approved",
        e.SIGNED = "signed",
        e.REJECTED = "rejected",
        e.CANCELED = "canceled"
    }(O || (O = {}));
    !function(e) {
        e.Enabled = "enabled",
        e.Disabled = "disabled",
        e.Empty = "empty",
        e.NotFound = "not_found",
        e.NoPromocodes = "no_promocodes"
    }(P || (P = {})),
    function(e) {
        e.Online = "online",
        e.OnDelivery = "onDelivery",
        e.CardOnDelivery = "cardOnDelivery"
    }(x || (x = {})),
    function(e) {
        e.SELF = "self",
        e.CUSTOM = "custom"
    }(A || (A = {})),
    function(e) {
        e.CITY = "city",
        e.REGION = "region",
        e.ALL = "all"
    }(w || (w = {})),
    function(e) {
        e.Create = "create",
        e.Delete = "delete",
        e.Update = "update"
    }(T || (T = {})),
    function(e) {
        e.Copy = "copy",
        e.Delete = "delete",
        e.Categorize = "categorize",
        e.Hide = "hide"
    }(M || (M = {})),
    function(e) {
        e.DomainNotFound = "DomainNotFound",
        e.ServerNotFound = "ServerNotFound",
        e.NotMapped = "NotMapped",
        e.MappedPartialy = "MappedPartialy",
        e.HasIpV6 = "HasIpV6",
        e.WrongIp = "WrongIp",
        e.NotApplied = "NotApplied",
        e.Unsupported = "Unsupported"
    }(D || (D = {}));
    const I = (e,t,s)=>{
        u.check(e.map((e=>({
            id: e.id,
            price: e.price,
            quantity: e.quantity,
            isHidden: e.isHidden,
            hasNewPrice: e.hasNewPrice
        }))), (()=>{
            t()
        }
        ), (e=>{
            if ([E.NoGoods, E.GoodsAreOut, E.AllGoodsAreOut, E.QuantityChanged, E.Failed].includes(e.code))
                return void s(e);
            const i = (e=>{
                const t = c.products.filter((e=>e.isHidden)).map((({id: e})=>e))
                  , s = e.filter((e=>e.isHidden)).map((({id: e})=>e));
                return !(s.length === t.length && s.every((e=>t.includes(e))))
            }
            )(e.goods);
            (e=>{
                const t = c.products.filter((e=>e.hasNewPrice)).map((({id: e, price: t})=>({
                    id: e,
                    price: t
                })));
                return !e.filter((({id: e, price: t})=>c.products.some((s=>s.id === e && s.price !== t)))).map((({id: e, price: t})=>({
                    id: e,
                    price: t
                }))).every((({id: e, price: s})=>t.some((t=>t.id === e && t.price === s))))
            }
            )(e.goods) || i ? s(e) : t(e)
        }
        ))
    }
      , R = {
        info: "step-info",
        checkout: "step-checkout",
        result: "step-result"
    }
      , j = "s-cart-modal_is-loading"
      , H = "is-visible";
    class N {
        constructor(e) {
            this.id = e,
            this._loading = !1,
            this._active = !1,
            this.root = y(R[e]),
            this.init()
        }
        set isLoading(e) {
            this._loading = e,
            e ? this.root.classList.add(j) : this.root.classList.remove(j)
        }
        get isLoading() {
            return this._loading
        }
        get isActive() {
            return this._active
        }
        activate(e=!0) {
            this.isLoading = !1,
            this._active = e,
            e ? (setTimeout((()=>this.root.classList.add(H)), 100),
            this.show()) : this.hide()
        }
        remove() {
            this.onNext = null,
            this.onBack = null,
            this.root.remove()
        }
        show() {}
        hide() {}
        next() {
            this.onNext && this.onNext()
        }
        back() {
            this.root.classList.remove(H),
            this.onBack && this.onBack()
        }
        init() {}
    }
    const q = new class {
        init(e, t, s) {
            return i.api.request({
                method: "POST",
                url: "/api/v1/ecomm-checkout/create-order",
                body: e,
                onSuccess: t,
                onError: s
            })
        }
        checkStatus(e, t, s) {
            return i.api.request({
                method: "POST",
                url: "/api/v1/ecomm-checkout/check-status",
                body: e,
                onSuccess: t,
                onError: s
            })
        }
        shopStatus(e, t) {
            return i.api.request({
                method: "POST",
                url: "/api/v1/ecomm-checkout/shop-status",
                body: {
                    hash: i.config.cartHash
                },
                onSuccess: e,
                onError: t
            })
        }
    }
    ;
    class F {
        getUserId() {
            return i.localStorage.get(F.userIdStorageKey) || this.createUserId(),
            i.localStorage.get(F.userIdStorageKey)
        }
        createUserId() {
            i.localStorage.set(F.userIdStorageKey, ((e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e + ((t &= 63) < 36 ? t.toString(36) : t < 62 ? (t - 26).toString(36).toUpperCase() : t > 62 ? "-" : "_")), ""))())
        }
    }
    F.userIdStorageKey = "user-id";
    const G = new F;
    const U = new class {
        metricsAddToCart() {
            const e = this.createRequestData(C.CartAddToCart);
            return i.api.request({
                method: "POST",
                url: "/api/v2/metrics/add-to-cart",
                body: e
            })
        }
        metricsOrderProcess() {
            const e = this.createRequestData(C.CartOrderProcess);
            return i.api.request({
                method: "POST",
                url: "/api/v2/metrics/order-process",
                body: e
            })
        }
        metricsOrderConfirm(e) {
            const t = this.createRequestData(C.CartOrderConfirm, e);
            return i.api.request({
                method: "POST",
                url: "/api/v2/metrics/order-confirm",
                body: t
            })
        }
        metricsPurchaseSuccess() {
            const e = this.createRequestData(C.CartPurchaseSuccess);
            return i.api.request({
                method: "POST",
                url: "/api/v2/metrics/purchase-success",
                body: e
            })
        }
        metricsEcommCheckout() {
            const e = this.createRequestData(C.CartEcommCheckout);
            return i.api.request({
                method: "POST",
                url: "/api/v2/metrics/ecomm-checkout",
                body: e
            })
        }
        createRequestData(e, t) {
            return {
                type: e,
                payload: {
                    hash: i.config.cartHash,
                    clientId: G.getUserId(),
                    paymentType: t
                }
            }
        }
    }
    ;
    var B = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , $ = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class V extends N {
        constructor(e, t) {
            super(e),
            this.id = e,
            this.cartWrapper = t,
            this.onItemAction = (e,t,s)=>{
                c.productChange(t, e, s),
                this.isLoading = !0,
                this.cartCheckProducts(c.products, (()=>{
                    this.isLoading = !1,
                    this.findAndShowNotification(),
                    this.update()
                }
                ), (e=>{
                    this.isLoading = !1,
                    this.onApiError(e)
                }
                ))
            }
            ,
            this.productsInfo = []
        }
        init() {
            this.emptyLinkElement.addEventListener("click", (()=>{
                this.closeCart()
            }
            )),
            this.clearButton.addEventListener("click", (()=>{
                c.productsClear(),
                this.hideNotification(),
                c.resetProductsState(),
                this.update()
            }
            )),
            this.isLoading = !0,
            c.fixed = !1,
            this.footerElement = document.createElement("step-info-footer"),
            this.footerElement.submitHandler = this.nextHandler.bind(this),
            this.footerElement.checkoutHandler = this.createEcommCheckoutOrder.bind(this),
            this.containerElement.insertAdjacentElement("afterend", this.footerElement)
        }
        show() {
            if (!c.products.length)
                return void this.showEmptyCartMessage();
            const e = this.createListContainer();
            "not_checked" !== c.productsState ? this.showProductsList(e) : (this.hideNotification(),
            this.apiFetchProducts((()=>{
                this.cartCheckProducts(c.products, (()=>{
                    this.isLoading = !1,
                    this.findAndShowNotification(),
                    this.update()
                }
                ), (e=>{
                    this.isLoading = !1,
                    this.onApiError(e)
                }
                ))
            }
            )),
            e.appendChild(y("info-loader")),
            this.footerElement.visible = !1),
            this.fetchEcommCheckoutShopStatus(),
            this.productListElement.remove(),
            this.containerElement.appendChild(e),
            this.footerElement.totalAmount = c.totalAmount,
            this.footerElement.productsState = c.productsState,
            this.footerElement.minAmount = this.getDeliveryMinAmount(),
            this.footerElement.costForFree = this.getDeliveryCost(),
            this.fetchLegalLinks()
        }
        onApiError({code: e, goods: t}) {
            if (e !== E.QuantityChanged) {
                if (e === E.EcommCheckoutRequestFailure)
                    return this.showNotification("ecomm_checkout_request_failure"),
                    void (c.productsState = "ecomm_checkout_request_failure");
                if (e !== E.Failed) {
                    switch (e) {
                    case E.NoGoods:
                        this.handleNoGoods(),
                        c.productsState = "no_goods";
                        break;
                    case E.AllGoodsAreOut:
                        this.handleAllGoodsAreOut(),
                        c.productsState = "all_goods_are_out";
                        break;
                    case E.GoodsAreOut:
                        this.handleGoodsAreOut(t),
                        c.productsState = "goods_are_out";
                        break;
                    case E.GoodsChanged:
                        this.handleGoodsChanged(t),
                        c.productsState = "goods_changed";
                        break;
                    default:
                        this.handleGoodsChanged(t),
                        c.resetProductsState()
                    }
                    this.findAndShowNotification(),
                    this.update()
                } else
                    this.showNotification("order_creation_failed")
            } else
                this.handleQuantityChanged(t)
        }
        handleNoGoods() {
            c.setProducts(c.products.map((e=>Object.assign(Object.assign({}, e), {
                isHidden: !0
            })))),
            c.productsState = "no_goods"
        }
        handleAllGoodsAreOut() {
            c.setProducts(c.products.map((e=>Object.assign(Object.assign({}, e), {
                quantity: 0
            }))))
        }
        handleGoodsAreOut(e) {
            c.setProducts(c.products.map((t=>void 0 === e.find((({id: e, quantity: s})=>t.id === e && "0" === s)) ? t : Object.assign(Object.assign({}, t), {
                quantity: 0
            }))))
        }
        handleQuantityChanged(e) {
            c.setProducts(c.products.map((t=>{
                const s = e.find((({id: e, quantity: s})=>t.id === e && null !== s));
                if (void 0 === s)
                    return t;
                const i = Number(s.quantity);
                return Object.assign(Object.assign({}, t), {
                    quantity: i,
                    maxQuantity: i
                })
            }
            ))),
            c.productsState = "quantity_changed",
            this.showNotification("quantity_changed"),
            this.update()
        }
        handleGoodsChanged(e) {
            c.setProducts(c.products.map((t=>{
                const s = e.find((({id: e})=>t.id === e));
                if (void 0 !== s) {
                    const e = Object.assign(Object.assign({}, t), {
                        isHidden: s.isHidden,
                        hasNewPrice: s.hasNewPrice
                    });
                    return s.hasNewPrice && s.price !== t.price && (e.oldPrice = e.price,
                    e.price = s.price),
                    e
                }
                return t
            }
            )))
        }
        showProductsList(e) {
            const t = c.products.map((({id: e})=>e));
            this.productsInfo = this.productsInfo.filter((({productId: e})=>t.includes(e)));
            for (const t of c.products) {
                let s = this.productsInfo.find((({productId: e})=>e === t.id));
                if (!s) {
                    const e = document.createElement("cart-item");
                    s = {
                        root: e,
                        productId: t.id,
                        set product(t) {
                            e.product = t
                        }
                    },
                    e.addEventListener("quantitychanged", (e=>{
                        this.onItemAction(3, t.id, e.detail)
                    }
                    )),
                    e.addEventListener("allremoved", (e=>{
                        this.onItemAction(2, t.id)
                    }
                    )),
                    this.productsInfo.push(s)
                }
                s.product = t,
                e.appendChild(s.root)
            }
            this.footerElement.visible = !0
        }
        createListContainer() {
            const e = document.createElement("ul");
            return e.classList.add("s-basket__list"),
            e
        }
        update() {
            this.updateTimeout || (this.updateTimeout = setTimeout((()=>{
                this.updateTimeout = null,
                this.show()
            }
            ), 100))
        }
        nextHandler() {
            this.isLoading || (this.isLoading = !0,
            this.checkout())
        }
        closeCart() {
            c.resetProductsState(),
            this.cartWrapper.show(!1)
        }
        showNotification(e) {
            const t = d[e];
            t && (this.notificationElement.classList.remove("sb-hidden"),
            this.notificationTextElement.innerText = t,
            "all_goods_are_out" === e && this.notificationButtonContainer.classList.remove("sb-hidden"))
        }
        hideNotification() {
            this.notificationElement.classList.add("sb-hidden"),
            this.notificationButtonContainer.classList.add("sb-hidden"),
            this.notificationTextElement.innerText = ""
        }
        getDeliveryCost() {
            const e = c.costForFree - c.totalAmount;
            return c.costForFree && e > 0 ? i.utils.numberWithSpaces(e) : ""
        }
        getDeliveryMinAmount() {
            return c.minOrderAmount && c.minOrderAmount > c.totalAmount ? i.utils.numberWithSpaces(c.minOrderAmount) : ""
        }
        showEmptyCartMessage() {
            this.emptyElement.style.display = "",
            this.productListElement.remove(),
            this.footerElement.remove()
        }
        cartCheckout() {
            u.checkout({
                products: c.products.map((({id: e, quantity: t})=>({
                    id: e,
                    quantity: t
                }))).filter((({quantity: e})=>0 !== e)),
                promocode: c.checkoutData.promocode
            }, (e=>{
                U.metricsOrderProcess(),
                c.checkout = e,
                "ecomm_checkout_request_failure" === c.productsState && this.hideNotification(),
                this.next()
            }
            ), (e=>{
                this.isLoading = !1,
                this.onApiError(e)
            }
            ))
        }
        cartCheckProducts(e, t, s) {
            I(e, (e=>{
                e ? s(e) : t()
            }
            ), (e=>{
                s(e)
            }
            ))
        }
        apiFetchProducts(e) {
            const t = c.products;
            u.products(t.map((({id: e})=>({
                id: e
            }))), (({products: s, minOrderAmount: i, costForFree: o})=>{
                var r;
                const n = [];
                for (const e of t) {
                    const t = s.find((t=>t.id === e.id))
                      , i = void 0 !== e.oldPrice ? e.oldPrice : e.price;
                    void 0 !== t ? n.push({
                        id: e.id,
                        name: t.name,
                        quantity: e.quantity,
                        price: e.price,
                        oldPrice: i,
                        amount: e.quantity * t.price,
                        preview: t.preview,
                        unit: t.unit,
                        categories: t.categories || [],
                        maxQuantity: Number(null !== (r = t.quantity) && void 0 !== r ? r : l),
                        isHidden: !1,
                        hasNewPrice: e.hasNewPrice,
                        paramsList: t.paramsList || null
                    }) : n.push({
                        id: e.id,
                        name: e.name,
                        quantity: e.quantity,
                        price: e.price,
                        oldPrice: i,
                        amount: e.quantity * e.price,
                        preview: e.preview,
                        unit: e.unit,
                        isHidden: !0,
                        categories: e.categories || [],
                        maxQuantity: e.maxQuantity,
                        hasNewPrice: e.hasNewPrice,
                        paramsList: e.paramsList || null
                    })
                }
                c.updateProducts(n),
                c.minOrderAmount = i || null,
                c.costForFree = o || null,
                0 !== n.length ? (c.productsState = "ok",
                "function" == typeof e && e()) : this.showEmptyCartMessage()
            }
            ), (e=>{
                this.isLoading = !1,
                this.onApiError(e)
            }
            ))
        }
        checkout() {
            I(c.products, (()=>{
                this.cartCheckout()
            }
            ), (e=>{
                this.isLoading = !1,
                this.onApiError(e)
            }
            ))
        }
        findAndShowNotification() {
            const e = c.products.filter((({isHidden: e})=>e))
              , t = c.products.filter((({hasNewPrice: e, isHidden: t})=>!t && e));
            let s = null;
            e.length === c.products.length ? s = "no_goods" : e.length && (s = "no_some_goods"),
            t.length && (s = "no_some_goods" === s ? "no_some_goods_price_changed" : "goods_price_changed"),
            this.productsWithZeroQuantityCount === c.products.length ? s = "all_goods_are_out" : this.productsWithZeroQuantityCount > 0 && (s = "goods_are_out"),
            null !== s && c.products.length > 0 ? this.showNotification(s) : this.hideNotification()
        }
        get productsWithZeroQuantityCount() {
            return c.products.filter((({quantity: e})=>0 === e)).length
        }
        fetchEcommCheckoutShopStatus() {
            i.config.enableSitesCheckoutIntegration && q.shopStatus((e=>{
                this.footerElement.enableEcommCheckoutIntegration = e.status === S.Active
            }
            ), (()=>null))
        }
        fetchLegalLinks() {
            u.fetchLegalLinks({
                hash: i.config.cartHash
            }, (e=>{
                this.footerElement.legalLinks = e
            }
            ), (()=>null))
        }
        createEcommCheckoutOrder() {
            const e = {
                hash: i.config.cartHash,
                products: c.products,
                totalAmount: c.totalAmount
            };
            this.hideNotification(),
            q.init(e, (e=>{
                U.metricsEcommCheckout(),
                c.productsClear(),
                c.createdOrderId = e.orderId,
                window.top.location.replace(e.url),
                this.isLoading = !1
            }
            ), (e=>{
                this.isLoading = !1,
                this.onApiError(e)
            }
            ))
        }
    }
    B([o(".s-basket__container"), $("design:type", HTMLElement)], V.prototype, "containerElement", void 0),
    B([o(".s-basket__list"), $("design:type", HTMLElement)], V.prototype, "productListElement", void 0),
    B([o(".s-basket__empty"), $("design:type", HTMLElement)], V.prototype, "emptyElement", void 0),
    B([o(".s-basket__empty-link"), $("design:type", HTMLElement)], V.prototype, "emptyLinkElement", void 0),
    B([o(".s-basket__notification"), $("design:type", HTMLElement)], V.prototype, "notificationElement", void 0),
    B([o(".s-basket__notification-text", "notificationElement"), $("design:type", HTMLElement)], V.prototype, "notificationTextElement", void 0),
    B([o(".s-basket__notification-button"), $("design:type", HTMLDivElement)], V.prototype, "notificationButtonContainer", void 0),
    B([o(".s-basket__clear-button"), $("design:type", HTMLButtonElement)], V.prototype, "clearButton", void 0);
    class W {
        constructor(e) {
            this.data = e;
            const {item: t, wrapper: s, classList: o=[], hide: r=!1, onSelect: n=null, getValues: a=null, update: d} = e;
            this.root = y("checkout-select", t),
            this.root.classList.add(...o),
            s.appendChild(this.root),
            r && (this.root.style.display = "none"),
            d && d(),
            i.modules.select.create(this.root, t, a, n)
        }
        remove() {
            this.root.remove()
        }
    }
    const Q = "Бесплатно"
      , Z = new Set(["Санкт-Петербург", "Москва"]);
    const K = new class {
        getNonSuitableProductsByCategories(e, t=[]) {
            if (0 === t.length)
                return [];
            const s = t.map((({title: e})=>e));
            return e.filter((({categories: e})=>Boolean(e) && e.length > 0)).filter((({categories: e})=>!e.some((e=>s.includes(e))))).map((({id: e, name: t})=>({
                id: e,
                name: t
            })))
        }
        geoObjectItemComparator(e, t) {
            if ("all" === e.id)
                return 1;
            const s = e.text.toLowerCase()
              , i = t.text.toLowerCase();
            return s < i ? -1 : s > i ? 1 : 0
        }
        moveGeoObjectItemToTop(e, t) {
            const s = e.map((({text: e})=>e.toLowerCase())).indexOf(t.toLowerCase());
            if (s > 0) {
                const t = e.splice(s, 1);
                e.unshift(...t)
            }
        }
    }
    ;
    var J = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , z = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class X {
        constructor(e, t=!1) {
            this.delivery = e,
            this.onValueUpdated = ()=>{
                this.inputElement.checked && this.onSelect && this.onSelect(this.delivery)
            }
            ,
            this.item = {
                id: e.id,
                title: Y.getTitle(e)
            },
            this.root = y("checkout-delivery", this.item),
            this.inputElement.addEventListener("change", this.onValueUpdated),
            this.inputElement.checked = t
        }
        remove() {
            this.root.remove()
        }
    }
    J([o("input"), z("design:type", HTMLInputElement)], X.prototype, "inputElement", void 0);
    class Y {
        constructor(e, t, s, i) {
            this.root = e,
            this.deliveries = t,
            this.description = s,
            this.link = i,
            this.RUSSIA_NAME = "Россия",
            this.SELECT_CLASS = "s-process-order__select",
            this.COUNTRIES_ROOT_CLASS = "s-process-order__countries-root",
            this.GEO_OBJECTS_ROOT_CLASS = "s-process-order__geo-objects-root",
            this.radioList = [],
            this.activeDelivery = null,
            this.countries = [],
            this.geoObjects = [],
            this.selectedCountry = "",
            this.selectedGeoObject = null,
            this.currentDeliveries = null,
            this._state = null,
            this.root.style.display = i || s || t && t.length ? "" : "none",
            this.renderInfo(s, i)
        }
        get state() {
            return this._state
        }
        get invalid() {
            return this.state && !this.state.address
        }
        init() {
            this.deliveries && this.deliveries.length && (c.deliveryState && c.deliveryState.value ? this._state = c.deliveryState.value : this.processDeliveries())
        }
        onSubmit() {
            this.state && "custom" === this.state.type && this.addressSelectInput && (this.state.address = this.addressSelectInput.value.trim(),
            c.deliveryState = Object.assign(Object.assign({}, c.deliveryState), {
                value: this.state
            })),
            this.deliveryAddressSelectError && (this.deliveryAddressSelectError.style.display = this.invalid ? "block" : "none")
        }
        clear(e, t) {
            this._state = null,
            c.deliveryState = {
                value: null,
                submitEnabled: !0
            },
            t && i.utils.clearElement(this.addressSelectContainer),
            [this.optionDetailsContainer, this.errorElement, this.expandErrorElement].forEach((e=>{
                e && e.remove()
            }
            )),
            this.onUnselect && this.onUnselect(),
            e && [this.addressContainer, this.radioListContainer, this.addressSelectContainer].forEach((e=>i.utils.clearElement(e)))
        }
        renderInfo(e, t) {
            if (!e && !t)
                return;
            const s = this.deliveryDescriptionElement;
            s.style.display = e ? "" : "none",
            s.innerText = e,
            this.deliveryLinkContainer.style.display = t ? "" : "none",
            this.deliveryLinkElement.href = t
        }
        processDeliveries() {
            for (const e of this.deliveries)
                e.options && e.options.filter((e=>e.enabled)).forEach((e=>{
                    const t = e.address;
                    t && (this.countries = this.countries.concat(t.countries || []),
                    t.countries && t.countries.includes(this.RUSSIA_NAME) && (this.geoObjects = this.geoObjects.concat(t && t.geoObjects || [])))
                }
                ));
            this.countries.length && (this.countries = [...new Set(this.countries)],
            this.filterGeoObjectDublicates(),
            this.countriesRoot || this.renderCountrySelect())
        }
        filterGeoObjectDublicates() {
            this.geoObjects.length && (this.geoObjects = this.geoObjects.filter(((e,t)=>this.geoObjects.findIndex((t=>t.name === e.name && t.type === e.type)) === t)))
        }
        sortCountrySelect(e) {
            return e.includes(this.RUSSIA_NAME) ? [this.RUSSIA_NAME, ...e.filter((e=>e !== this.RUSSIA_NAME)).sort()] : Array.from(e).sort()
        }
        renderCountrySelect() {
            this.createSelect({
                item: {
                    id: "country-select",
                    type: "combobox",
                    name: "Страна",
                    list: this.sortCountrySelect(this.countries).map((e=>({
                        text: e
                    }))),
                    initial: this.countries.includes(this.RUSSIA_NAME) ? this.RUSSIA_NAME : this.countries[0]
                },
                wrapper: this.addressContainer,
                classList: [this.SELECT_CLASS, this.COUNTRIES_ROOT_CLASS],
                onSelect: this.onCountrySelect.bind(this),
                update: ()=>{
                    this.geoObjects.length && !this.geoObjectsRoot && this.renderGeoObjectSelect()
                }
            })
        }
        renderGeoObjectSelect() {
            const e = this.prepareGeoItemsForCombobox();
            this.createSelect({
                item: {
                    id: "geoobject-select",
                    type: "combobox",
                    name: "Зона доставки",
                    list: e,
                    initial: 1 === e.length ? e[0].text : null
                },
                wrapper: this.addressContainer,
                classList: [this.SELECT_CLASS, this.GEO_OBJECTS_ROOT_CLASS],
                hide: !0,
                onSelect: this.onGeoObjectSelect.bind(this),
                update: ()=>{
                    1 === this.countries.length && this.countries[0] === this.RUSSIA_NAME && (this.countriesRoot.style.display = "none",
                    this.geoObjectsRoot.style.display = "",
                    this.selectedCountry = this.RUSSIA_NAME)
                }
            })
        }
        createSelect(e) {
            return new W(e)
        }
        getAddress(e, t, s, i) {
            u.address({
                query: t.trim().toLowerCase(),
                meta: e
            }, (e=>{
                s(e.map((e=>e.value)))
            }
            ), i)
        }
        onCountrySelect(e) {
            const t = e.trim();
            if (this.clear(!1, !0),
            this.updatePaymentMethods(),
            this.selectedCountry = t,
            t === this.RUSSIA_NAME && this.geoObjects.length)
                return this.geoObjectsRoot.style.display = "",
                void (this.selectedGeoObject ? this.renderDeliveryList(this.mapDeliveriesByGeoObject(this.selectedGeoObject)) : this.clearRadioList());
            this.geoObjectsRoot && (this.geoObjectsRoot.style.display = "none"),
            this.renderDeliveryList(this.mapDeliveriesByCountry(t))
        }
        onGeoObjectSelect(e, t) {
            const s = e.trim();
            this.clear(!1, !0),
            this.updatePaymentMethods(),
            this.selectedGeoObject = {
                name: s,
                type: t
            },
            this.renderDeliveryList(this.mapDeliveriesByGeoObject(this.selectedGeoObject))
        }
        mapDeliveriesByCountry(e) {
            return this.deliveries.map((t=>Object.assign(Object.assign({}, t), {
                options: t.options.filter((t=>t.address && t.address.countries.includes(e)))
            }))).filter((e=>!!e.options.length))
        }
        mapDeliveriesByGeoObject(e) {
            return this.deliveries.map((t=>Object.assign(Object.assign({}, t), {
                options: t.options.filter((t=>t.address && t.address.geoObjects && t.address.geoObjects.some((t=>"all" === t.type || t.name === e.name && t.type === e.type))))
            }))).filter((e=>!!e.options.length))
        }
        renderDeliveryList(e) {
            if (this.clearRadioList(),
            this.currentDeliveries = [...e],
            e.length > 6)
                return void this.createSelect({
                    item: {
                        id: "delivery-select",
                        type: "select",
                        name: "Способ доставки",
                        list: e.map((e=>({
                            text: Y.getTitle(e),
                            id: e.id
                        })))
                    },
                    wrapper: this.radioListContainer,
                    onSelect: this.onDeliverySelect.bind(this, e)
                });
            const t = 1 === e.length;
            for (const s of e) {
                const e = new X(s,t);
                e.onSelect = this.onDeliverySelectChange.bind(this),
                this.radioList.push(e),
                this.radioListContainer.appendChild(e.root),
                t && this.onDeliverySelectChange(s)
            }
        }
        onDeliverySelect(e, t, s) {
            s && e && this.onDeliverySelectChange(e.find((e=>e.id === s)))
        }
        clearRadioList() {
            i.utils.clearElement(this.radioListContainer),
            this.radioList.forEach((e=>e.remove())),
            this.radioList = [],
            this.onUnselect(),
            this._state = null,
            this.currentDeliveries = null
        }
        onDeliverySelectChange(e) {
            var t;
            if (e && (this.clear(!1, !0),
            this.activeDelivery = e,
            "self" === e.type && (this.activeDelivery = Object.assign(Object.assign({}, this.activeDelivery), {
                options: (null !== (t = this.activeDelivery.options) && void 0 !== t ? t : []).map((e=>Object.assign(Object.assign({}, e), {
                    nonSuitableProducts: K.getNonSuitableProductsByCategories(c.products, e.goodsCategories)
                })))
            }),
            this.createPickUpPointSelect(),
            this.updatePaymentMethods()),
            "custom" === e.type)) {
                let t = null;
                const s = this.activeDelivery.options.find((({address: e})=>{
                    let s = e.countries.includes(this.selectedCountry);
                    return this.selectedCountry === this.RUSSIA_NAME && this.selectedGeoObject && e.geoObjects && (t = e.geoObjects.find((e=>"all" === e.type || e.type === this.selectedGeoObject.type && e.name === this.selectedGeoObject.name)),
                    s = !!t),
                    s
                }
                ));
                if (!s)
                    return;
                s.nonSuitableProducts = K.getNonSuitableProductsByCategories(c.products, s.goodsCategories);
                const i = !s.minOrderAmount || c.totalAmount >= s.minOrderAmount
                  , o = !s.nonSuitableProducts.length;
                if (this.createAddressDynamicCombobox(t),
                this.createOptionDetails(e.type, s),
                this.updateState(s, "", t, i && o),
                !i)
                    return void this.showMinOrderAmountError(s);
                o || this.showProductCategoriesError(s)
            }
        }
        showMinOrderAmountError(e) {
            this.root.appendChild(y("checkout-field-error", `Данный тип доставки доступен для заказов от ${e.minOrderAmount} ₽`)),
            this.errorElement.style.display = "flex"
        }
        showProductCategoriesError(e) {
            const t = e.nonSuitableProducts.map((({name: e})=>e))
              , s = this.activeDelivery.type
              , i = this.currentDeliveries.length
              , o = {
                custom: "из заказа доставка недоступна",
                self: "из заказа самовывоз недоступен"
            }
              , r = t.length > 1 ? "товаров" : "товара";
            let n = "Чтобы продолжить,";
            if ("self" === s) {
                this.activeDelivery.options.every((({nonSuitableProducts: e})=>!!(null == e ? void 0 : e.length))) ? i > 1 && (n = "Выберите другой способ или") : (n = "Выберите другой пункт или",
                o.self = "из заказа самовывоз в выбранный пункт недоступен")
            } else
                i > 1 && (n = "Выберите другой способ или");
            const a = `${t.length} ${r} ${o[s]}. ${n}`;
            this.root.appendChild(y("product-categories-error-expand", {
                text: a,
                items: t
            })),
            this.listenShowItemsButtonClick(),
            this.listenRemoveGoodsButtonClick(e)
        }
        listenShowItemsButtonClick() {
            this.expandShowItemsButton && this.expandCutContainer && this.expandShowItemsButton.addEventListener("click", (()=>{
                const e = "s-process-order__expand-cut_opened";
                this.expandCutContainer.classList.toggle(e);
                const t = this.expandCutContainer.classList.contains(e) ? "Скрыть товары" : "Показать все товары";
                this.expandShowItemsButton.innerText = t
            }
            ))
        }
        listenRemoveGoodsButtonClick(e) {
            this.expandRemoveGoodsButton && this.expandRemoveGoodsButton.addEventListener("click", (()=>{
                const t = e.nonSuitableProducts.map((({id: e})=>e))
                  , s = c.products.filter((({id: e})=>!t.includes(e)));
                c.updateProducts(s),
                this.apiCheckout(e, s)
            }
            ))
        }
        apiCheckout(e, t) {
            t.length ? (this.setRemovingProductsLoading(!0),
            u.checkout({
                products: c.products.map((e=>({
                    id: e.id,
                    quantity: e.quantity
                }))),
                promocode: c.checkoutData.promocode
            }, (t=>{
                let s = !0;
                c.checkout = t,
                e.nonSuitableProducts = [],
                this.setRemovingProductsLoading(!1),
                this.expandErrorElement.remove(),
                "custom" === this.activeDelivery.type && (s = !e.minOrderAmount || c.totalAmount >= e.minOrderAmount,
                s || this.showMinOrderAmountError(e)),
                this.updateState(e, this.state.address, this.state.geoObject, s)
            }
            ), (()=>{
                this.setRemovingProductsLoading(!1)
            }
            ))) : this.close()
        }
        setRemovingProductsLoading(e) {
            e ? (this.expandErrorElement.classList.add("s-process-order__expand_loading"),
            this.expandLoaderIcon.style.display = "flex",
            this.expandLoaderIcon.style.opacity = "1") : (this.expandErrorElement.classList.remove("s-process-order__expand_loading"),
            this.expandLoaderIcon.style.display = "none",
            this.expandLoaderIcon.style.opacity = "0")
        }
        createPickUpPointSelect() {
            this.createSelect({
                item: {
                    id: "pickup-point-select",
                    type: "select",
                    name: "Пункт самовывоза",
                    list: (this.activeDelivery.options || []).map((e=>{
                        const t = Y.getOptionPrice(e);
                        return {
                            text: e.title || e.address.fullValue,
                            rightContent: t > 0 ? `${t} ₽` : Q,
                            id: e.id.toString()
                        }
                    }
                    ))
                },
                wrapper: this.addressSelectContainer,
                classList: [this.SELECT_CLASS],
                onSelect: this.onPickUpPointSelect.bind(this)
            })
        }
        createAddressDynamicCombobox(e) {
            const t = this.selectedCountry !== this.RUSSIA_NAME || "all" === e.type ? {
                country: this.selectedCountry
            } : {
                [e.type]: e.searchName || e.name
            };
            this.createSelect({
                item: {
                    id: "address-dynamic-combobox",
                    type: "dynamic-combobox",
                    name: "Адрес доставки",
                    emptyText: "Начните вводить адрес"
                },
                wrapper: this.addressSelectContainer,
                classList: [this.SELECT_CLASS],
                getValues: this.getAddress.bind(this, t)
            })
        }
        onPickUpPointSelect(e, t) {
            if (!t || !this.activeDelivery || "self" !== this.activeDelivery.type || !this.activeDelivery.options)
                return;
            const s = this.activeDelivery.options.find((({id: e})=>e.toString() === t));
            if (!s)
                return;
            this.clear();
            const i = !s.nonSuitableProducts.length;
            this.createOptionDetails(this.activeDelivery.type, s),
            this.updateState(s, s.address.fullValue, null, i),
            i || this.showProductCategoriesError(s)
        }
        createOptionDetails(e, t) {
            let s = {
                type: e,
                period: t.deliveryPeriod
            };
            "self" === e && (s = Object.assign(Object.assign({}, s), {
                address: t.address.fullValue,
                hours: t.workingHours,
                comment: t.comment
            })),
            this.root.appendChild(y("delivery-option-details", s))
        }
        updateState(e, t="", s=null, i=!1) {
            const o = Y.getOptionPrice(e);
            this._state = {
                id: this.activeDelivery.id,
                type: this.activeDelivery.type,
                option: {
                    id: e.id,
                    isFree: 0 === o,
                    cost: e.cost || 0
                },
                address: t,
                country: this.selectedCountry,
                totalAmount: o,
                geoObject: s
            },
            c.deliveryState = {
                value: this.state,
                submitEnabled: i
            },
            this.onStateChange(),
            this.updatePaymentMethods(e.paymentMethods && e.paymentMethods.length ? e.paymentMethods.filter((e=>c.checkout.paymentMethods.includes(e))) : c.checkout.paymentMethods)
        }
        static getOptionPrice(e) {
            return e.isFree || !!e.costForFree && c.totalAmount >= e.costForFree ? 0 : e.cost
        }
        static getTitle(e) {
            let t = e.title || "Без названия";
            const s = [];
            s.push(...e.options.map((e=>this.getOptionPrice(e))));
            const i = Math.min(...s);
            return "self" === e.type && (e.options.length > 1 ? t += ` от ${i} ₽` : t += i > 0 ? ` — ${i} ₽` : " — Бесплатно"),
            "custom" === e.type && (t += i > 0 ? ` — ${i} ₽` : " — Бесплатно"),
            t
        }
        static checkDeliveries(e, t) {
            if (!e)
                return [];
            const s = e.filter((e=>(e.options || []).some((e=>e.enabled))));
            return t.length ? s.map((e=>Object.assign(Object.assign({}, e), {
                options: e.options.filter((e=>!e.paymentMethods || !e.paymentMethods.length || e.paymentMethods.some((e=>t.includes(e)))))
            }))).filter((e=>e.options && e.options.length)) : s
        }
        prepareGeoItemsForCombobox() {
            const e = 1 === this.geoObjects.length && "all" === this.geoObjects[0].type ? "Все регионы" : "Другие регионы"
              , t = this.geoObjects.map((t=>({
                text: "all" === t.type ? e : t.name,
                id: t.type
            }))).sort(K.geoObjectItemComparator);
            return Z.forEach((e=>{
                K.moveGeoObjectItemToTop(t, e)
            }
            )),
            t
        }
    }
    J([o(".s-process-order__description"), z("design:type", HTMLElement)], Y.prototype, "deliveryDescriptionElement", void 0),
    J([o(".s-process-order__link"), z("design:type", HTMLElement)], Y.prototype, "deliveryLinkContainer", void 0),
    J([o(".s-process-order__link a"), z("design:type", HTMLAnchorElement)], Y.prototype, "deliveryLinkElement", void 0),
    J([o(".s-process-order__countries-root"), z("design:type", HTMLAnchorElement)], Y.prototype, "countriesRoot", void 0),
    J([o(".s-process-order__geo-objects-root"), z("design:type", HTMLAnchorElement)], Y.prototype, "geoObjectsRoot", void 0),
    J([o(".s-process-order__address-container"), z("design:type", HTMLElement)], Y.prototype, "addressContainer", void 0),
    J([o(".s-process-order__radio-container"), z("design:type", HTMLElement)], Y.prototype, "radioListContainer", void 0),
    J([o(".s-process-order__address-select"), z("design:type", HTMLElement)], Y.prototype, "addressSelectContainer", void 0),
    J([o(".s-process-order__address-select input"), z("design:type", HTMLInputElement)], Y.prototype, "addressSelectInput", void 0),
    J([o(".s-process-order__address-select .sb-input__error"), z("design:type", HTMLElement)], Y.prototype, "deliveryAddressSelectError", void 0),
    J([o(".s-process-order__option-details"), z("design:type", HTMLElement)], Y.prototype, "optionDetailsContainer", void 0),
    J([o(".s-process-order__status_error"), z("design:type", HTMLElement)], Y.prototype, "errorElement", void 0),
    J([o(".s-process-order__expand"), z("design:type", HTMLElement)], Y.prototype, "expandErrorElement", void 0),
    J([o(".s-process-order__expand-cut", "expandErrorElement"), z("design:type", HTMLElement)], Y.prototype, "expandCutContainer", void 0),
    J([o(".s-process-order__expand-button", "expandErrorElement"), z("design:type", HTMLElement)], Y.prototype, "expandShowItemsButton", void 0),
    J([o(".s-process-order__remove-goods", "expandErrorElement"), z("design:type", HTMLElement)], Y.prototype, "expandRemoveGoodsButton", void 0),
    J([o(".s-cart-modal__loader-icon", "expandErrorElement"), z("design:type", HTMLElement)], Y.prototype, "expandLoaderIcon", void 0);
    const ee = window;
    var te = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , se = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class ie {
        constructor(e, t="") {
            this.item = e,
            this.updateValue = (e,t)=>{
                this.inputElement.value = e,
                "phone" === t && e === "+7 ".trim() || (setTimeout((()=>{
                    0 !== e.length && this.inputElement.dispatchEvent(new Event("input"))
                }
                )),
                this.isTextarea || setTimeout((()=>{
                    this.inputElement.dispatchEvent(new Event("blur"))
                }
                )))
            }
            ,
            this.onValueUpdated = ()=>{
                const {value: e} = this.inputElement;
                e ? this.inputContainer.classList.add(this.activeClass) : this.inputContainer.classList.remove(this.activeClass),
                this.onChange && this.onChange(this.item.id, e)
            }
            ,
            this.root = y("checkout-field", e);
            const {name: s, isRequired: i=!0, type: o} = e;
            this.titleElement.innerText = i ? `${s}*` : s,
            this.updateValue(t, o),
            this.onValueUpdated(),
            i && this.inputElement.setAttribute("required", String(i)),
            this.inputElement.addEventListener("input", this.onValueUpdated)
        }
        remove() {
            this.root.remove()
        }
        get isTextarea() {
            return "textarea" === this.item.type
        }
        get titleElement() {
            return this.isTextarea ? this.textareaTitleElement : this.inputTitleElement
        }
        get inputElement() {
            return this.isTextarea ? this.textareaFieldElement : this.inputFieldElement
        }
        get inputContainer() {
            return this.isTextarea ? this.sbTextareaContainer : this.sbInputContainer
        }
        get activeClass() {
            return this.isTextarea ? ie.CLASS_TEXTAREA_ACTIVE : ie.CLASS_FIELD_ACTIVE
        }
    }
    ie.CLASS_FIELD_ACTIVE = "sb-input_active",
    ie.CLASS_TEXTAREA_ACTIVE = "sb-textarea_active",
    te([o(".sb-input"), se("design:type", HTMLElement)], ie.prototype, "sbInputContainer", void 0),
    te([o(".sb-textarea"), se("design:type", HTMLElement)], ie.prototype, "sbTextareaContainer", void 0),
    te([o(".sb-input__placeholder"), se("design:type", HTMLElement)], ie.prototype, "inputTitleElement", void 0),
    te([o(".sb-textarea__placeholder"), se("design:type", HTMLElement)], ie.prototype, "textareaTitleElement", void 0),
    te([o(".sb-input__field"), se("design:type", HTMLInputElement)], ie.prototype, "inputFieldElement", void 0),
    te([o(".sb-textarea__field"), se("design:type", HTMLInputElement)], ie.prototype, "textareaFieldElement", void 0);
    var oe = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , re = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class ne {
        constructor(e, t) {
            this.item = e,
            this.onValueUpdated = ()=>{
                this.inputElement.checked && this.onSelect && this.onSelect(this.item)
            }
            ,
            this.root = y("checkout-payment", e),
            this.inputElement.checked = !!t,
            this.inputElement.addEventListener("change", this.onValueUpdated)
        }
        remove() {
            this.root.remove()
        }
    }
    oe([o("input"), re("design:type", HTMLInputElement)], ne.prototype, "inputElement", void 0);
    var ae = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , de = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class ce {
        constructor(e, t) {
            this.promocodeState = e,
            this.value = t,
            this.onValueUpdated = ()=>{
                const e = this.inputElement.value;
                this.inputStatusElement.style.display = "none",
                e ? (this.inputContainer.classList.add(ce.CLASS_FIELD_ACTIVE),
                this.promocodeApplyElement.style.display = "") : (this.inputContainer.classList.remove(ce.CLASS_FIELD_ACTIVE),
                this.promocodeApplyElement.style.display = "none")
            }
            ,
            this.onApplyPromocode = e=>{
                e && e.preventDefault();
                const t = this.inputElement.value;
                this.onPromocodeChange && this.onPromocodeChange(t)
            }
            ,
            this.clear = e=>{
                e.preventDefault(),
                this.inputElement.value = null,
                this.inputElement.disabled = !1,
                this.promocodeClearElement.style.display = "none",
                this.onValueUpdated(),
                this.onPromocodeChange && this.onPromocodeChange(null)
            }
            ,
            this.applyPromocodeSuccessfully = ()=>{
                this.promocodeClearElement.style.display = "",
                this.promocodeApplyElement.style.display = "none",
                this.inputElement.disabled = !0
            }
            ,
            this.root = y("promocode-field", t),
            this.inputElement.value = t,
            this.onValueUpdated(),
            this.onApplyPromocode(),
            this.setStatus(e),
            this.inputElement.addEventListener("input", this.onValueUpdated),
            this.promocodeClearElement.addEventListener("click", this.clear),
            this.promocodeApplyElement.addEventListener("click", this.onApplyPromocode)
        }
        remove() {
            this.root.remove()
        }
        setStatus(e) {
            switch (this.inputStatusElement.style.display = "",
            this.inputStatusElement.innerText = "message"in e ? e.message : "",
            e.state) {
            case "disabled":
            case "not_found":
                this.inputStatusElement.classList.remove(ce.CLASS_STATUS_SUCCESS),
                this.inputStatusElement.classList.add(ce.CLASS_STATUS_ERROR);
                break;
            case "enabled":
                this.inputStatusElement.classList.remove(ce.CLASS_STATUS_ERROR),
                this.inputStatusElement.classList.add(ce.CLASS_STATUS_SUCCESS),
                this.applyPromocodeSuccessfully();
                break;
            case "empty":
                this.inputStatusElement.style.display = "none"
            }
        }
    }
    ce.CLASS_FIELD_ACTIVE = "sb-input_active",
    ce.CLASS_STATUS_SUCCESS = "sb-input__status_success",
    ce.CLASS_STATUS_ERROR = "sb-input__status_error",
    ae([o(".sb-input__field"), de("design:type", HTMLInputElement)], ce.prototype, "inputElement", void 0),
    ae([o(".sb-input__status"), de("design:type", HTMLElement)], ce.prototype, "inputStatusElement", void 0),
    ae([o(".sb-input"), de("design:type", HTMLElement)], ce.prototype, "inputContainer", void 0),
    ae([o(".s-process-order__promocode-apply"), de("design:type", HTMLElement)], ce.prototype, "promocodeApplyElement", void 0),
    ae([o(".s-process-order__promocode-clear"), de("design:type", HTMLElement)], ce.prototype, "promocodeClearElement", void 0);
    var le = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , pe = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    class ue extends N {
        constructor() {
            super(...arguments),
            this.onApiError = e=>{
                [E.NoGoods, E.GoodsChanged, E.GoodsAreOut, E.AllGoodsAreOut, E.QuantityChanged].includes(e.code) && c.resetProductsState(),
                this.back()
            }
            ,
            this.isSubmitDisabled = !1,
            this.fields = [],
            this.payments = [],
            this.onPaymentMethodChange = e=>{
                c.updateCheckoutData({
                    paymentMethod: c.checkout.paymentMethods.includes(e) ? e : null
                })
            }
            ,
            this.onFieldValueChange = (e,t)=>{
                c.updateCheckoutData({
                    fields: Object.assign(Object.assign({}, c.checkoutData.fields), {
                        [e]: t
                    })
                })
            }
            ,
            this.onPromocodeValueChange = e=>{
                c.updateCheckoutData({
                    promocode: e
                }),
                this.setPromocodeLoading(!0),
                u.promocode(c.products.map((e=>({
                    id: e.id,
                    quantity: e.quantity
                }))), c.checkoutData.promocode, (e=>{
                    c.checkout = Object.assign(Object.assign({}, c.checkout), {
                        amount: e.amount,
                        promocode: e.promocodeState
                    }),
                    this.promocodeWrapper.setStatus(e.promocodeState);
                    const t = this.deliveryWrapper.state && this.deliveryWrapper.state.totalAmount || 0;
                    this.renderPrice(t, "enabled" === e.promocodeState.state),
                    this.setPromocodeLoading(!1)
                }
                ), (()=>{
                    this.setPromocodeLoading(!1)
                }
                ))
            }
        }
        init() {
            c.fixed = !0,
            this.submitElement.addEventListener("click", (e=>{
                e.preventDefault(),
                this.nextHandler()
            }
            )),
            this.backElement.addEventListener("click", (()=>{
                this.back()
            }
            ))
        }
        show() {
            const {checkout: e, checkoutData: t} = c;
            this.renderFormFields(e.fields, t.fields),
            this.renderFormPayment(),
            this.renderPromocodeField(e.promocode, t.promocode),
            this.renderPrice(),
            this.renderDelivery(e.deliveries, e.deliveryDescription, e.deliveryLink)
        }
        back() {
            super.back(),
            c.fixed = !1,
            this.deliveryWrapper.clear(!0)
        }
        getSelectedPaymentMethod(e) {
            const {checkoutData: t} = c;
            let {paymentMethod: s} = t;
            return s ? e.includes(s) || (s = e.length ? e[0] : null) : e.length && (s = e[0]),
            s !== t.paymentMethod && this.onPaymentMethodChange(s),
            s
        }
        renderFormFields(e, t) {
            if (this.fields.map((e=>e.item.id)).join(",") !== e.map((e=>e.id)).join(",")) {
                i.utils.clearElement(this.fieldsListElement),
                this.fields.forEach((e=>e.remove())),
                this.fields = [];
                for (const s of e) {
                    const e = new ie(s,t[s.id] || []);
                    e.onChange = this.onFieldValueChange,
                    this.fields.push(e),
                    this.fieldsListElement.appendChild(e.root)
                }
                try {
                    i.createForm(this.root, {
                        disableSubmitFlow: !0
                    })
                } catch (e) {
                    console.error(e)
                }
                this.fieldsListElement.appendChild(y("checkout-field-error", "Пожалуйста, заполните все обязательные поля"))
            }
        }
        renderFormPayment(e=c.checkout.paymentMethods) {
            const t = this.getSelectedPaymentMethod(e);
            if (this.payments.map((e=>e.item)).join(",") === e.join(","))
                return;
            i.utils.clearElement(this.paymentListElement),
            this.paymentContainer.style.display = e.length ? "" : "none",
            this.payments.forEach((e=>e.remove())),
            this.payments = [];
            const s = Object.values(p).filter((t=>e.includes(t)));
            for (const e of s) {
                const s = new ne(e,e === t);
                s.onSelect = this.onPaymentMethodChange,
                this.payments.push(s),
                this.paymentListElement.appendChild(s.root)
            }
        }
        renderPromocodeField(e, t) {
            e && "no_promocodes" !== e.state && (i.utils.clearElement(this.promocodeElement),
            this.promocodeContainer.style.display = "",
            this.promocodeWrapper = new ce(e,t),
            this.promocodeWrapper.onPromocodeChange = this.onPromocodeValueChange,
            this.promocodeElement.appendChild(this.promocodeWrapper.root))
        }
        renderDelivery(e, t, s) {
            const {paymentMethods: i} = c.checkout
              , o = Y.checkDeliveries(e, i);
            this.deliveryWrapper = new Y(this.deliveryContainer,o,t,s),
            this.isSubmitDisabled = !!o.length,
            this.isSubmitDisabled && (this.submitElement.setAttribute("disabled", "true"),
            this.deliveryWrapper.onStateChange = this.renderPriceWithDelivery.bind(this),
            this.deliveryWrapper.onUnselect = this.hidePriceWithDelivery.bind(this),
            this.deliveryWrapper.updatePaymentMethods = this.renderFormPayment.bind(this),
            this.deliveryWrapper.close = this.back.bind(this),
            this.deliveryWrapper.init(),
            this.renderPriceWithDelivery())
        }
        renderPrice(e=0, t=c.checkout.promocode && "enabled" === c.checkout.promocode.state) {
            this.totalAmountElement.innerText = i.utils.numberWithSpaces(c.checkout.amount + e),
            t ? (this.totalAmountBeforeDiscountElement.innerText = i.utils.numberWithSpaces(c.totalAmount + e) + "₽",
            this.totalAmountBeforeDiscountElement.setAttribute("aria-label", `Цена без скидки ${i.utils.numberWithSpaces(c.totalAmount + e)}₽`)) : this.totalAmountBeforeDiscountElement.innerText = ""
        }
        renderPriceWithDelivery() {
            const e = c.deliveryState;
            if (!e || !e.value)
                return;
            this.intermediateAmountContainer.style.display = "",
            this.deliveryAmountContainer.style.display = "",
            this.intermediateAmountElement.innerText = i.utils.numberWithSpaces(c.totalAmount);
            const t = i.utils.numberWithSpaces(e.value.totalAmount);
            this.deliveryAmountElement.innerText = "0" !== t ? `${t} ₽` : "Бесплатно",
            e.submitEnabled && (this.isSubmitDisabled = !1,
            this.submitElement.removeAttribute("disabled")),
            this.renderPrice(e.value.totalAmount)
        }
        hidePriceWithDelivery() {
            this.intermediateAmountContainer.style.display = "none",
            this.deliveryAmountContainer.style.display = "none",
            this.isSubmitDisabled = !0,
            this.submitElement.setAttribute("disabled", "true"),
            this.renderPrice()
        }
        setPromocodeLoading(e) {
            e ? this.promocodeContainer.classList.add("s-process-order__promocode_loading") : this.promocodeContainer.classList.remove("s-process-order__promocode_loading")
        }
        nextHandler() {
            if (this.isLoading || this.isSubmitDisabled)
                return;
            let e = !1;
            const t = this.fieldsErrorElement
              , s = c.checkoutData
              , o = c.checkout.fields.map((({id: e, isRequired: t})=>({
                id: e,
                value: (s.fields[e] || "").trim(),
                isRequired: t
            })));
            if (o.some((e=>e.isRequired && !e.value)) && t && (t.style.display = "flex",
            e = !0,
            this.fields.forEach((e=>{
                e.inputElement.dispatchEvent(new Event("click")),
                e.inputElement.dispatchEvent(new Event("blur"))
            }
            )),
            t.scrollIntoView({
                behavior: "smooth",
                block: "end"
            })),
            this.deliveryWrapper.onSubmit(),
            this.deliveryWrapper.invalid && (e = !0),
            e)
                return;
            t && (t.style.display = "none");
            i.utils.querySelectorAll(".sb-input__error", this.fieldsListElement).some((e=>!!e.innerText)) || (this.isLoading = !0,
            c.createdOrderId = null,
            this.confirm(o, s))
        }
        cartCheckProducts(e) {
            I(c.products, (()=>{
                e()
            }
            ), (e=>{
                this.isLoading = !1,
                this.onApiError(e)
            }
            ))
        }
        cartConfirm(e, t) {
            u.confirm({
                fields: e,
                products: c.products.map((({id: e, price: t, quantity: s})=>({
                    id: e,
                    price: t,
                    quantity: s
                }))),
                paymentMethod: t.paymentMethod,
                promocode: t.promocode,
                delivery: this.deliveryWrapper.state || null,
                totalAmount: c.checkout.amount
            }, (e=>{
                const s = this.getMetricPaymentType(t.paymentMethod);
                if (U.metricsOrderConfirm(s),
                c.productsClear(),
                e.redirectLink)
                    return c.createdOrderId = e.id,
                    void window.top.location.replace(e.redirectLink);
                c.result = {
                    name: e.name,
                    message: e.message
                },
                this.deliveryWrapper.clear(!0);
                const o = {
                    successUrl: e.successUrl || ""
                };
                U.metricsPurchaseSuccess(),
                i.modules.events.publish(i.modules.events.CART_SUBMIT, o),
                this.isLoading = !1,
                this.next()
            }
            ), (()=>{
                this.isLoading = !1,
                c.result = null,
                this.next()
            }
            ))
        }
        confirm(e, t) {
            this.cartCheckProducts((()=>{
                this.cartConfirm(e, t)
            }
            ))
        }
        getMetricPaymentType(e) {
            return e === p.Online ? L.Online : L.Offline
        }
    }
    le([o(".s-process-order__summary span.s-process-order__after-discount"), pe("design:type", HTMLElement)], ue.prototype, "totalAmountElement", void 0),
    le([o(".s-process-order__summary span.s-process-order__before-discount"), pe("design:type", HTMLElement)], ue.prototype, "totalAmountBeforeDiscountElement", void 0),
    le([o(".s-process-order__amount"), pe("design:type", HTMLElement)], ue.prototype, "intermediateAmountContainer", void 0),
    le([o(".s-process-order__amount span"), pe("design:type", HTMLElement)], ue.prototype, "intermediateAmountElement", void 0),
    le([o(".s-process-order__delivery-amount"), pe("design:type", HTMLElement)], ue.prototype, "deliveryAmountContainer", void 0),
    le([o(".s-process-order__delivery-amount span"), pe("design:type", HTMLElement)], ue.prototype, "deliveryAmountElement", void 0),
    le([o(".s-cart-modal__submit-button"), pe("design:type", HTMLElement)], ue.prototype, "submitElement", void 0),
    le([o(".s-process-order__back"), pe("design:type", HTMLElement)], ue.prototype, "backElement", void 0),
    le([o(".s-process-order__fields .s-process-order__row"), pe("design:type", HTMLElement)], ue.prototype, "fieldsListElement", void 0),
    le([o(".s-process-order__fields .s-process-order__status_error"), pe("design:type", HTMLElement)], ue.prototype, "fieldsErrorElement", void 0),
    le([o(".s-process-order__payment"), pe("design:type", HTMLElement)], ue.prototype, "paymentContainer", void 0),
    le([o(".s-process-order__payment .s-process-order__row"), pe("design:type", HTMLElement)], ue.prototype, "paymentListElement", void 0),
    le([o(".s-process-order__delivery"), pe("design:type", HTMLElement)], ue.prototype, "deliveryContainer", void 0),
    le([o(".s-process-order__promocode"), pe("design:type", HTMLElement)], ue.prototype, "promocodeContainer", void 0),
    le([o(".s-process-order__promocode .s-process-order__row"), pe("design:type", HTMLElement)], ue.prototype, "promocodeElement", void 0);
    var he = function(e, t, s, i) {
        var o, r = arguments.length, n = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, s) : i;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            n = Reflect.decorate(e, t, s, i);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, s, n) : o(t, s)) || n);
        return r > 3 && n && Object.defineProperty(t, s, n),
        n
    }
      , me = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    };
    const ye = {
        title: "Спасибо за оформление заказа",
        description: "Мы получили Ваш заказ и скоро свяжемся с Вами"
    };
    class ve extends N {
        constructor() {
            super(...arguments),
            this.statusRetryCount = 0,
            this.fetchingResult = !1
        }
        activate(e=!0) {
            if (e) {
                const e = c.createdOrderId;
                e && (this.orderId = e,
                this.fetchingResult = !0,
                c.createdOrderId = null,
                this.fetchResultTimeout())
            }
            super.activate(e)
        }
        init() {
            this.closeElement.addEventListener("click", (()=>{
                this.next()
            }
            )),
            this.result = c.result,
            c.result = null
        }
        show() {
            if (this.fetchingResult)
                return this.isLoading = !0,
                this.loaderContainer.style.display = "",
                this.resultContainer.style.display = "none",
                void (this.closeElement.style.display = "none");
            if (this.loaderContainer.style.display = "none",
            this.resultContainer.style.display = "",
            this.closeElement.style.display = "",
            !this.result)
                return this.iconFailElement.style.display = "",
                this.iconSuccessElement.style.display = "none",
                this.titleContainer.innerText = "Что-то пошло не так",
                void (this.descriptionElement.innerText = "Попробуйте повторить оформление заказа позже");
            this.iconFailElement.style.display = "none",
            this.iconSuccessElement.style.display = "";
            const e = this.result.message ? {
                title: this.result.message.title || "",
                description: this.result.message.description || ""
            } : ye;
            this.titleContainer.style.display = "",
            this.descriptionElement.style.display = "",
            this.orderElement.innerText = `Заказ №${this.result.name}`,
            this.titleElement.innerText = e.title,
            this.descriptionElement.innerText = e.description
        }
        fetchResultTimeout() {
            setTimeout((()=>{
                this.fetchResult()
            }
            ), 3e3 * this.statusRetryCount)
        }
        fetchResult() {
            this.statusRetryCount++,
            u.status(this.orderId, (e=>this.onCheckSuccess(e)), (()=>this.onCheckError()))
        }
        onCheckSuccess(e) {
            var t;
            if (this.isActive)
                if (!e.isPayed && this.statusRetryCount < 3)
                    this.fetchResultTimeout();
                else {
                    if (e.isPayed) {
                        this.result = {
                            name: e.name,
                            message: e.message || null
                        };
                        const s = null !== (t = i.utils.getQueryParameter("success-url")) && void 0 !== t ? t : ""
                          , o = {
                            successUrl: decodeURIComponent(s)
                        };
                        i.modules.events.publish(i.modules.events.CART_SUBMIT, o),
                        U.metricsPurchaseSuccess()
                    }
                    this.fetchingResult = !1,
                    this.isLoading = !1,
                    this.show()
                }
        }
        onCheckError() {
            this.isActive && (this.fetchingResult = !1,
            this.isLoading = !1,
            this.show())
        }
    }
    he([o(".s-order-processed__icon-success"), me("design:type", HTMLElement)], ve.prototype, "iconSuccessElement", void 0),
    he([o(".s-order-processed__icon-fail"), me("design:type", HTMLElement)], ve.prototype, "iconFailElement", void 0),
    he([o(".s-order-processed__title"), me("design:type", HTMLElement)], ve.prototype, "titleContainer", void 0),
    he([o(".s-order-processed__title .order"), me("design:type", HTMLElement)], ve.prototype, "orderElement", void 0),
    he([o(".s-order-processed__title .title"), me("design:type", HTMLElement)], ve.prototype, "titleElement", void 0),
    he([o(".s-order-processed__description"), me("design:type", HTMLElement)], ve.prototype, "descriptionElement", void 0),
    he([o(".s-order-processed__list-loader"), me("design:type", HTMLElement)], ve.prototype, "loaderContainer", void 0),
    he([o(".s-order-processed__list-result"), me("design:type", HTMLElement)], ve.prototype, "resultContainer", void 0),
    he([o(".s-order-processed__deactivate"), me("design:type", HTMLElement)], ve.prototype, "closeElement", void 0);
    const _e = new class {
        constructor() {
            this.stepsMap = {},
            this.currentStepId = null,
            this.onVisibilityChange = e=>{
                e || "result" !== this.currentStepId || this.clean(!1),
                this.onVisibilityChangeCB && this.onVisibilityChangeCB(e)
            }
            ,
            this.onStepNext = ()=>{
                this.step && ("info" === this.currentStepId ? this.goStep("checkout") : "checkout" === this.currentStepId ? this.goStep("result") : "result" === this.currentStepId && this.clean())
            }
            ,
            this.onStepBack = ()=>{
                this.step && ("info" === this.currentStepId || "result" === this.currentStepId ? this.clean() : "checkout" === this.currentStepId && this.goStep("info"))
            }
            ,
            this.wrapper = new g,
            this.wrapper.onVisibilityChange = this.onVisibilityChange;
            const e = i.utils.getQueryParameter("payment");
            "fail-cart" === e ? (c.createdOrderId = null,
            this.showResult()) : "success-cart" === e && c.createdOrderId ? this.showResult() : c.createdOrderId = null
        }
        get step() {
            return this.currentStepId ? this.stepsMap[this.currentStepId] : null
        }
        set step(e) {
            this.currentStepId = e.id
        }
        get hasProducts() {
            return c.products.length > 0
        }
        apiShow() {
            this.wrapper.show(),
            this.step ? this.step.activate() : this.goStep("info"),
            ee.tb.perfume.end("ecomm_sites_published_cart_open", "success")
        }
        initGoodsParamsDialog(e, t, s, o) {
            if (!t)
                return;
            window.addEventListener("removeQueryParams", i.utils.removeQueryParameters);
            const r = document.createElement("product-dialog");
            return r.data = t,
            r.goodsId = e,
            r.getSelectorAction = this.getSelectorAction,
            r.buttonAction = ((e,t)=>{
                this.addProduct(e, (e=>{
                    t(e),
                    o(e)
                }
                ))
            }
            ).bind(this),
            r.isLoading = !0,
            u.fetchProductData(e, (e=>{
                r.isLoading = !1,
                r.currentProduct = e,
                r.images = e.photos,
                r.firstImage = s
            }
            ), (()=>{
                r.isLoading = !1,
                r.hasError = !0
            }
            )),
            r
        }
        getSelectorAction(e, t, s, i) {
            return (o,r)=>{
                const n = e.findIndex((e=>e.id === r.paramId));
                if (-1 === n ? e.push({
                    id: r.paramId,
                    valueId: o
                }) : e[n] = {
                    id: r.paramId,
                    valueId: o
                },
                e.length < t.length)
                    return;
                const a = s.find((t=>{
                    var s;
                    return null === (s = t.paramsInfo) || void 0 === s ? void 0 : s.every((t=>e.find((e=>e.id === t.id && e.valueId === t.valueId.toString()))))
                }
                ));
                return a ? (a.isHidden ? i.isLoading ? (i.postponedDisabled = !0,
                i.title = "Нет в наличии") : (i.disabled = !0,
                i.title = "Нет в наличии") : i.disabled && (i.disabled = !1,
                i.title = "Добавить в корзину"),
                a) : void 0
            }
        }
        apiAdd(e, t, s, o, r=!1) {
            if (e)
                if (this.clean(!1),
                r) {
                    const r = this.initGoodsParamsDialog(e, t, s, o);
                    i.modules.popups.showPreparedPopup(r)
                } else
                    this.addProduct(e, o)
        }
        apiCountProducts() {
            return c.products.reduce(((e,t)=>e + t.quantity), 0)
        }
        apiSetOnVisibilityChange(e) {
            this.onVisibilityChangeCB = e
        }
        goStep(e) {
            if (!this.stepsMap[e]) {
                let t;
                if ("info" === e ? (t = new V("info",this.wrapper),
                t.onNext = this.onStepNext,
                t.onBack = this.onStepBack) : "checkout" === e ? (t = new ue("checkout"),
                t.onNext = this.onStepNext,
                t.onBack = this.onStepBack) : "result" === e && (t = new ve("result"),
                t.onNext = this.onStepNext),
                !t)
                    return;
                this.stepsMap[e] = t,
                this.wrapper.addStep(t)
            }
            this.step && this.step.activate(!1),
            this.step = this.stepsMap[e],
            this.step.activate()
        }
        clean(e=!0) {
            this.currentStepId = null,
            c.fixed = !1,
            e && this.wrapper.show(!1);
            for (const e of Object.keys(this.stepsMap))
                this.stepsMap[e].remove();
            this.stepsMap = {}
        }
        addProduct(e, t) {
            i.perfume.start("ecomm_sites_published_cart_add"),
            u.products([{
                id: e
            }], (({products: s=[]})=>{
                var o, r;
                U.metricsAddToCart();
                const n = null !== (o = null == s ? void 0 : s[0]) && void 0 !== o ? o : null;
                if (null === n)
                    return i.modules.popups.showTemplatePopup("orderHiddenGoods"),
                    t(!1),
                    void i.perfume.end("ecomm_sites_published_cart_add", "success");
                const a = this.checkProductAvailable(n)
                  , d = c.products.find((t=>t.id === e))
                  , p = void 0 === d || this.checkExistingProductAvailable(d);
                return a && p ? void 0 !== d ? (c.productChange(e, 0),
                t(!0),
                c.resetProductsState(),
                void i.perfume.end("ecomm_sites_published_cart_add", "success")) : (c.productAdd({
                    id: n.id,
                    name: n.name,
                    quantity: 1,
                    maxQuantity: Number(null !== (r = n.quantity) && void 0 !== r ? r : l),
                    price: n.price,
                    oldPrice: n.price,
                    amount: n.price,
                    preview: n.preview,
                    unit: n.unit,
                    isHidden: void 0 !== n.isHidden && n.isHidden,
                    categories: n.categories || [],
                    hasNewPrice: !1,
                    paramsList: n.paramsList || null
                }),
                c.resetProductsState(),
                t(!0),
                void i.perfume.end("ecomm_sites_published_cart_add", "success")) : (i.modules.popups.showTemplatePopup("orderHiddenGoods"),
                t(!1),
                void i.perfume.end("ecomm_sites_published_cart_add", "success"))
            }
            ), (()=>{
                t(!1),
                i.perfume.end("ecomm_sites_published_cart_add", "error")
            }
            ))
        }
        showResult() {
            this.currentStepId || (this.wrapper.show(),
            this.goStep("result"))
        }
        checkProductAvailable(e) {
            return !e.isHidden && "0" !== e.quantity
        }
        checkExistingProductAvailable(e) {
            return e.quantity < e.maxQuantity
        }
    }
    ;
    class fe {
        constructor(e) {
            this.root = e,
            this.animationDuration = 400,
            this.buttonLoaderTemplate(e.innerHTML),
            e.classList.add("sb-button-adding-to-cart"),
            e.disabled = !0
        }
        finish(e) {
            e ? (this.root.classList.add("sb-button-adding-to-cart_checked"),
            setTimeout((()=>{
                setTimeout((()=>{
                    this.clean()
                }
                ), this.animationDuration),
                this.root.classList.add("sb-button-adding-to-cart_final")
            }
            ), this.animationDuration)) : this.clean()
        }
        clean() {
            var e;
            this.root.classList.remove("sb-button-adding-to-cart_final", "sb-button-adding-to-cart_checked", "sb-button-adding-to-cart"),
            this.root.innerHTML = null === (e = this.root.querySelector("#initial-text-content")) || void 0 === e ? void 0 : e.innerHTML,
            this.root.disabled = Boolean(this.root.dataset.disabled),
            this.root.dataset.disabled = ""
        }
        buttonLoaderTemplate(e) {
            this.root.innerHTML = `<div class="sb-button-adding-text" id="initial-text-content">${e}</div>\n            <div class="sb-button-adding-icon"></div>`
        }
    }
    window.tbCart = {
        show: ()=>_e.apiShow(),
        add: (e,t,s,i,o=!1)=>_e.apiAdd(e, t, s, i, o),
        countProducts: ()=>_e.apiCountProducts(),
        setOnVisibilityChange: e=>_e.apiSetOnVisibilityChange(e),
        getButtonLoader: e=>new fe(e),
        hasProducts: ()=>_e.hasProducts
    }
}
]);
