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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sale_1 = require("../models/sale");
var card_1 = require("../models/card");
var cart_1 = require("../models/cart");
var product_1 = require("../models/product");
var services_1 = require("../services");
var constants_1 = require("../services/email/constants");
var createSale = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, products, total, customer_id, args, productInvestment, realTotal, newSale, emailProducts, activeCart, products_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, products = _a.products, total = _a.total, customer_id = _a.customer_id, args = __rest(_a, ["products", "total", "customer_id"]);
                productInvestment = products.reduce(function (accumulator, object) {
                    return (accumulator +
                        (object.our_purchase_price
                            ? object.our_purchase_price
                            : parseFloat(object.customerPrice) * 0.4) *
                            object.qty);
                }, 0);
                realTotal = total - productInvestment;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                return [4 /*yield*/, card_1.default.bulkWrite(products.map(function (card) { return ({
                        updateOne: {
                            filter: { _id: card.id },
                            update: { $inc: { stock: -card.quantity, sold: +card.quantity } },
                            upsert: false,
                        },
                    }); }))];
            case 2:
                _b.sent();
                return [4 /*yield*/, product_1.default.bulkWrite(products.map(function (product) { return ({
                        updateOne: {
                            filter: { _id: product.id },
                            update: {
                                $inc: { stock: -product.quantity, sold: +product.quantity },
                            },
                            upsert: false,
                        },
                    }); }))];
            case 3:
                _b.sent();
                return [4 /*yield*/, sale_1.default.create(__assign({ products: products, total: total, net_earning: isNaN(realTotal) ? 0 : realTotal, customer_id: customer_id }, args))];
            case 4:
                newSale = _b.sent();
                emailProducts = products.map(function (product) {
                    var _a;
                    var productsPrice = parseFloat(product === null || product === void 0 ? void 0 : product.customerPrice) * product.quantity;
                    return {
                        text: product === null || product === void 0 ? void 0 : product.name,
                        image: product === null || product === void 0 ? void 0 : product.image,
                        price: productsPrice === null || productsPrice === void 0 ? void 0 : productsPrice.toString(),
                        quantity: (_a = product === null || product === void 0 ? void 0 : product.quantity) === null || _a === void 0 ? void 0 : _a.toString(),
                    };
                });
                return [4 /*yield*/, services_1.EmailService.newOrderEmail({
                        amount: total,
                        currency: args.payment_currency,
                        email: args.customer,
                        orderId: newSale._id,
                        products: emailProducts,
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, services_1.EmailService.newOrderEmail({
                        amount: total,
                        currency: args.payment_currency,
                        email: constants_1.SENDER_EMAIL,
                        orderId: newSale._id,
                        products: emailProducts,
                    })];
            case 6:
                _b.sent();
                return [4 /*yield*/, cart_1.default.findOne({ userId: customer_id })];
            case 7:
                activeCart = _b.sent();
                if (!activeCart) return [3 /*break*/, 9];
                products_1 = [];
                return [4 /*yield*/, cart_1.default.updateOne({ userId: customer_id }, {
                        products: products_1,
                    })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [2 /*return*/, res.status(200).send({
                    status: "success",
                    message: "Created Sale",
                    createdItem: newSale,
                })];
            case 10:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        message: "Error creating Sale",
                        error: error_1,
                    })];
            case 11: return [2 /*return*/];
        }
    });
}); };
var getSales = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, page, limit, startDate, endDate, options, results;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, page = _a.page, limit = _a.limit, startDate = _a.startDate, endDate = _a.endDate;
                options = {
                    page: page,
                    limit: limit,
                    collation: {
                        locale: "en",
                    },
                    sort: { created_at: -1 },
                };
                return [4 /*yield*/, sale_1.default.paginate(__assign(__assign({}, options), { query: {
                            customer_id: userId,
                        } }))];
            case 1:
                results = _b.sent();
                try {
                    return [2 /*return*/, res.status(200).send({
                            status: "success",
                            model: "Sales",
                            sales: results === null || results === void 0 ? void 0 : results.docs,
                            totalDocs: results === null || results === void 0 ? void 0 : results.totalDocs,
                            totalPages: results === null || results === void 0 ? void 0 : results.totalPages,
                            page: results === null || results === void 0 ? void 0 : results.page,
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(412).send({
                            status: "error",
                            model: "Category",
                            error: error,
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = { getSales: getSales, createSale: createSale };
