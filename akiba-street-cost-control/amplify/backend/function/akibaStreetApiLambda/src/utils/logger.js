"use strict";
exports.__esModule = true;
exports["default"] = (function (status, message) {
    switch (status) {
        case "success":
            console.log("\x1b[34m", message);
            return;
        default:
            break;
    }
});
