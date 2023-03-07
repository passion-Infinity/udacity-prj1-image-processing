"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var file_1 = __importDefault(require("./utils/file"));
var app = (0, express_1.default)();
var port = 3000;
// cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () {
    file_1.default.createThumbPath();
    console.log("Server is running on port ".concat(port));
    console.log("http://localhost:3000");
});
exports.default = app;
