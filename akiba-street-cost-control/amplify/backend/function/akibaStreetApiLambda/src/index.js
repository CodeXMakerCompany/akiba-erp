"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var awsServerlessExpress = require("aws-serverless-express");
var app_1 = require("./app");
var server = awsServerlessExpress.createServer(app_1.default);
var handler = function (event, context) {
    console.log("EVENT: ".concat(JSON.stringify(event)));
    return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
exports.handler = handler;
