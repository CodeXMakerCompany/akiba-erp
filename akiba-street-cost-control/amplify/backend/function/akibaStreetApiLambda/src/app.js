"use strict";
exports.__esModule = true;
var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var db_1 = require("./config/db");
var category_1 = require("./routes/category");
var sales_1 = require("./routes/sales");
var upload_1 = require("./routes/upload");
var product_1 = require("./routes/product");
var events_1 = require("./routes/events");
var dotenv = require("dotenv");
require("dotenv/config");
dotenv.config();
// declare a new express app
var app = express();
var port = process.env.SERVER_PORT || 6666;
// const router = express.Router();
(0, db_1["default"])();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(cors({ origin: true }));
app.use("/api/category", category_1["default"]);
app.use("/api/sales", sales_1["default"]);
app.use("/api/upload", upload_1["default"]);
app.use("/api/product", product_1["default"]);
app.use("/api/event", events_1["default"]);
app.listen(port, function () {
    console.log("App started", port);
});
// Export the app object. When executing the application locally, this does nothing. However,
// to port it to AWS Lambda, we will create a wrapper that will load the app from this file
exports["default"] = app;
