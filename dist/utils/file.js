"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var imageProccessing_1 = __importDefault(require("./imageProccessing"));
var promises_1 = __importDefault(require("fs/promises"));
var File = /** @class */ (function () {
    function File() {
    }
    File.getImagePath = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, type, extension, filePath, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!params.filename) {
                            return [2 /*return*/, null];
                        }
                        name = params.filename.split('.')[0];
                        type = params.filename.split('.')[1];
                        extension = File.getImageExtension(type);
                        filePath = params.width && params.height
                            ? path_1.default.resolve(File.imgThumb, "".concat(name, "-").concat(params.width, "x").concat(params.height, ".").concat(extension))
                            : path_1.default.resolve(File.imgFull, "".concat(params.filename));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, promises_1.default.access(filePath)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, filePath];
                    case 3:
                        _b = _c.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    File.checkAvailableImage = function (filename) {
        if (filename === void 0) { filename = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!filename) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, File.getAvailableImageNames()];
                    case 1: return [2 /*return*/, (_b.sent()).includes(filename)];
                }
            });
        });
    };
    File.getAvailableImageNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promises_1.default.readdir(File.imgFull)];
                    case 1: return [2 /*return*/, (_c.sent()).map(function (filename) { return filename; })];
                    case 2:
                        _b = _c.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    File.checkAvailableThumb = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, type, extension, filePath, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!params.filename || !params.width || !params.height) {
                            return [2 /*return*/, false];
                        }
                        name = params.filename.split('.')[0];
                        type = params.filename.split('.')[1];
                        extension = File.getImageExtension(type);
                        filePath = path_1.default.resolve(File.imgThumb, "".concat(name, "-").concat(params.width, "x").concat(params.height, ".").concat(extension));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, promises_1.default.access(filePath)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _b = _c.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    File.createThumbPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promises_1.default.access(File.imgThumb)];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        promises_1.default.mkdir(File.imgThumb);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    File.createThumb = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, type, extension, filePathFull, filePathThumb;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.filename || !params.width || !params.height) {
                            return [2 /*return*/, null];
                        }
                        name = params.filename.split('.')[0];
                        type = params.filename.split('.')[1];
                        extension = File.getImageExtension(type);
                        filePathFull = path_1.default.resolve(File.imgFull, "".concat(params.filename));
                        filePathThumb = path_1.default.resolve(File.imgThumb, "".concat(name, "-").concat(params.width, "x").concat(params.height, ".").concat(extension));
                        console.log("Thumb path: ".concat(filePathThumb));
                        return [4 /*yield*/, (0, imageProccessing_1.default)({
                                source: filePathFull,
                                target: filePathThumb,
                                type: extension,
                                width: parseInt(params.width),
                                height: parseInt(params.height),
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    var _a;
    _a = File;
    File.imgFull = path_1.default.resolve(__dirname, '../../assets/images/full');
    File.imgThumb = path_1.default.resolve(__dirname, '../../assets/images/thumb');
    File.validate = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var availableImageNames, width, height;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, File.checkAvailableImage(query.filename)];
                case 1:
                    if (!!(_b.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, File.getAvailableImageNames()];
                case 2:
                    availableImageNames = (_b.sent()).join(', ');
                    return [2 /*return*/, "Please pass an available filename to view orginal image.\n                    The available filenames are: ".concat(availableImageNames, ".\n                    Example: /api/images?filename=abc.jpg\n                    If you want to resize image, pass width and height.\n                    Example: /api/images?filename=abc.jpg&width=50&height=50")];
                case 3:
                    if (!query.width && !query.height) {
                        return [2 /*return*/, null];
                    }
                    width = parseInt(query.width || '');
                    if (Number.isNaN(width) && width < 1) {
                        return [2 /*return*/, 'Please pass an available width in query segment.'];
                    }
                    height = parseInt(query.height || '');
                    if (Number.isNaN(height) || height < 1) {
                        return [2 /*return*/, 'Please pass an available height in query segment.'];
                    }
                    return [2 /*return*/, null];
            }
        });
    }); };
    File.getImageExtension = function (type) {
        var extension = 'jpg';
        if (type === 'jpeg' || type === 'png') {
            extension = type;
        }
        return extension;
    };
    return File;
}());
exports.default = File;
