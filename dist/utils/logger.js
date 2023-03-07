"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("".concat(fullUrl, " was visited!!!"));
    next();
};
exports.default = logger;
