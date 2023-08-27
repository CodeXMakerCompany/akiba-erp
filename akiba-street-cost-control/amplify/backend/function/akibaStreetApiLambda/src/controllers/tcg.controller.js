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
var scrappeWixossCards_1 = require("../scrapper/wixoss/scrappeWixossCards");
var shadowverse_1 = require("../scrapper/shadowverse");
var scrappeWixossRarities_1 = require("../scrapper/wixoss/scrappeWixossRarities");
var scrappeShadowverseRarities_1 = require("../scrapper/shadowverse/scrappeShadowverseRarities");
var card_1 = require("../models/card");
var rarities_1 = require("../models/rarities");
var category_1 = require("../models/category");
var getCards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, _b, team, rarity, selectedClass, types, product_type, tcg, options, query, cards, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, page = _a.page, size = _a.size;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                _b = req.query, team = _b.team, rarity = _b.rarity, selectedClass = _b.selectedClass, types = _b.types, product_type = _b.product_type, tcg = _b.tcg;
                options = {
                    page: page,
                    limit: size,
                    sort: { _id: -1 },
                };
                query = { tcg: { $regex: "^".concat(tcg, "$"), $options: "i" } };
                team ? (query.master = team) : "";
                rarity ? (query.rarity = rarity) : "";
                selectedClass ? (query.LRIG_SIGNI_type = selectedClass) : "";
                types ? (query.card_type = types) : "";
                product_type ? (query.product_type = product_type) : "";
                return [4 /*yield*/, card_1.default.paginate(__assign(__assign({}, options), { query: query }))];
            case 2:
                cards = _c.sent();
                res.status(200).send({
                    status: "success",
                    message: "Products found",
                    data: cards,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_1,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateWixossCards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = req.body.endpoint;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, scrappeWixossCards_1.scrappeWixossCards)(endpoint)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "TCG",
                        response: "done",
                    })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_2,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateShadowverseCards = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var setname, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setname = req.body.setname;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, shadowverse_1.scrappeShadowverseCards)(setname)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "TCG",
                        response: "done",
                    })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_3,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateCardsPrices = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rarity, buyPrice, sellPrice, category, stock;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, rarity = _a.rarity, buyPrice = _a.buyPrice, sellPrice = _a.sellPrice, category = _a.category, stock = _a.stock;
                return [4 /*yield*/, card_1.default.updateMany({ rarity: { $regex: rarity, $options: "i" }, tcg: category }, {
                        $set: {
                            stock: parseInt(stock),
                            prices: [
                                {
                                    buyPrice: buyPrice,
                                    sellPrice: sellPrice,
                                    mode: "single_card",
                                    currency: "mxn",
                                },
                            ],
                        },
                    })];
            case 1:
                _b.sent();
                try {
                    return [2 /*return*/, res.status(200).send({
                            status: "success",
                            model: "TCG",
                            response: "done",
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(412).send({
                            status: "error",
                            model: "TCG",
                            error: error,
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
var updateWixossRarities = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = req.body.endpoint;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, scrappeWixossRarities_1.scrappeWixossRarities)(endpoint)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "TCG",
                        response: "done",
                    })];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_4,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateShadowverseRarities = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = req.body.endpoint;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, scrappeShadowverseRarities_1.scrappeShadowverseRarities)(endpoint)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "TCG",
                        response: "done",
                    })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_5,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getRariritiesByTCG = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tcg, query, category, rarities, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tcg = req.params.tcg;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                query = { name: { $regex: "^".concat(tcg, "$"), $options: "i" } };
                return [4 /*yield*/, category_1.default.findOne(__assign({}, query))];
            case 2:
                category = _a.sent();
                return [4 /*yield*/, rarities_1.default.find({ categoryId: category._id })];
            case 3:
                rarities = _a.sent();
                res.status(200).send({
                    status: "success",
                    message: "Rarirties found",
                    data: rarities,
                });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_6,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateSingleCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, args, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, args = __rest(_a, ["id"]);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, card_1.default.findByIdAndUpdate(id, __assign({}, args))];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: "success",
                        model: "TCG",
                        response: "Card updated succesfully",
                    })];
            case 3:
                error_7 = _b.sent();
                return [2 /*return*/, res.status(412).send({
                        status: "error",
                        model: "TCG",
                        error: error_7,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    updateShadowverseCards: updateShadowverseCards,
    updateWixossCards: updateWixossCards,
    updateShadowverseRarities: updateShadowverseRarities,
    getCards: getCards,
    updateCardsPrices: updateCardsPrices,
    updateWixossRarities: updateWixossRarities,
    getRariritiesByTCG: getRariritiesByTCG,
    updateSingleCard: updateSingleCard,
};
