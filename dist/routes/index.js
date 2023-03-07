"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("../utils/logger"));
var images_1 = __importDefault(require("./api/images"));
var routes = express_1.default.Router();
routes.use('/api/images', images_1.default);
routes.get('/', logger_1.default, function (req, res) {
    res.send('Visit endpoint http://localhost:3000/api/images to process images');
});
exports.default = routes;
