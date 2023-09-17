"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var cart_1 = require("../models/cart");
var getUserCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, activeCart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 2:
                activeCart = _a.sent();
                if (!!activeCart) return [3 /*break*/, 4];
                return [4 /*yield*/, cart_1.default.create({ userId: userId })];
            case 3:
                activeCart = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(200).send({
                    status: "success",
                    model: "Cart",
                    cart: activeCart,
                })];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "Cart",
                        error: error_1,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
var addItemToCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, item, userId, activeCart, products, targetItem, updatedCart, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, item = _a.item, userId = _a.userId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 2:
                activeCart = _c.sent();
                if (!activeCart) return [3 /*break*/, 4];
                products = __spreadArray([], activeCart.products, true);
                targetItem = products.find(function (product) { return product.id === item._id; });
                if (!targetItem) {
                    products = __spreadArray(__spreadArray([], products, true), [
                        {
                            id: item._id,
                            name: item.name,
                            customerPrice: ((_b = item === null || item === void 0 ? void 0 : item.prices) === null || _b === void 0 ? void 0 : _b.length)
                                ? item === null || item === void 0 ? void 0 : item.prices[0].sellPrice
                                : item.customerPrice,
                            image: item.image,
                            stock: item.stock,
                            quantity: 1,
                        },
                    ], false);
                }
                else {
                    products = products.map(function (product) {
                        var quantity = parseInt(product.quantity);
                        if (item._id === product.id) {
                            return __assign(__assign({}, product), { quantity: quantity + 1 });
                        }
                        return product;
                    });
                }
                return [4 /*yield*/, cart_1.default.updateOne({ userId: userId }, {
                        products: products,
                    })];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 5:
                updatedCart = _c.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "Cart",
                        cart: updatedCart,
                    })];
            case 6:
                error_2 = _c.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "Cart",
                        error: error_2,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateItemInCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, userId, quantity, activeCart, products, updatedCart, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, productId = _a.productId, userId = _a.userId, quantity = _a.quantity;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 2:
                activeCart = _b.sent();
                if (!activeCart) return [3 /*break*/, 4];
                products = __spreadArray([], activeCart.products, true);
                products = products.map(function (product) {
                    if (product.id === productId) {
                        return __assign(__assign({}, product), { quantity: quantity });
                    }
                    return product;
                });
                products = products.filter(function (product) {
                    return product.quantity !== "0";
                });
                return [4 /*yield*/, cart_1.default.updateOne({ userId: userId }, {
                        products: products,
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 5:
                updatedCart = _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "Cart",
                        cart: updatedCart,
                    })];
            case 6:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "Cart",
                        error: error_3,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var cleanCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, activeCart, products, updatedCart, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 2:
                activeCart = _a.sent();
                if (!activeCart) return [3 /*break*/, 4];
                products = [];
                return [4 /*yield*/, cart_1.default.updateOne({ userId: userId }, {
                        products: products,
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, cart_1.default.findOne({ userId: userId })];
            case 5:
                updatedCart = _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "Cart",
                        cart: updatedCart,
                    })];
            case 6:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "Cart",
                        error: error_4,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = { getUserCart: getUserCart, addItemToCart: addItemToCart, updateItemInCart: updateItemInCart, cleanCart: cleanCart };
