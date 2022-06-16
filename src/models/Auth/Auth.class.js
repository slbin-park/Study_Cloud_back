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
        while (_) try {
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
exports.__esModule = true;
require("config/env");
var Auth_Sql_1 = require("./Auth.Sql");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var jwt = require('jsonwebtoken');
var Auth = /** @class */ (function () {
    function Auth(body, token) {
        if (token === void 0) { token = ''; }
        this.body = body;
        this.token = token;
    }
    Auth.prototype.create_Refresh_Token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            var _this = this;
            return __generator(this, function (_a) {
                info = this.body;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve(jwt.sign({
                                'id': info.id,
                                'name': info.name,
                                'major': info.major,
                                'school': info.school
                            }, process.env.JWT_REFRESH_SECRET, {
                                expiresIn: "180days"
                            }));
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    // Access Token 생성
    Auth.prototype.create_Access_Token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            var _this = this;
            return __generator(this, function (_a) {
                info = this.body;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve(jwt.sign({
                                'id': info.id,
                                'name': info.name,
                                'major': info.major,
                                'school': info.school
                            }, process.env.JWT_ACCESS_SECRET, {
                                //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
                                expiresIn: "10m"
                            }));
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Auth.prototype.checkToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, token, secret_key;
            return __generator(this, function (_a) {
                try {
                    info = this.body;
                    token = info.headers.authorization;
                    secret_key = info.body.check ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
                    // check 가 true면 Access , false면 Refresh
                    // const payload = jwt.decode(token, secret_key);
                    return [2 /*return*/, {
                            token: jwt.verify(token, secret_key), success: true
                        }];
                }
                catch (error) {
                    console.log(error.name);
                    // 유효기간이 초과된 경우
                    if (error.name === 'TokenExpiredError') {
                        return [2 /*return*/, { success: false, msg: '토큰이 만료되었습니다.' }]; // 419 추가예정
                    }
                    // 토큰의 비밀키가 일치하지 않는 경우
                    return [2 /*return*/, { success: false, msg: '유효하지 않은 토큰입니다.' }]; // 401 추가예정
                }
                return [2 /*return*/];
            });
        });
    };
    Auth.prototype.check_refresh_Token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        info = this.body;
                        return [4 /*yield*/, Auth_Sql_1["default"].SELECT_Refresh_Token(info)];
                    case 1:
                        token = _a.sent();
                        // check 가 true면 Access , false면 Refresh
                        // const payload = jwt.decode(token, secret_key);
                        return [2 /*return*/, {
                                token: token
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.name);
                        // 유효기간이 초과된 경우
                        if (error_1.name === 'TokenExpiredError') {
                            return [2 /*return*/, { success: false, msg: '토큰이 만료되었습니다.' }]; // 419 추가예정
                        }
                        // 토큰의 비밀키가 일치하지 않는 경우
                        return [2 /*return*/, { success: false, msg: '유효하지 않은 토큰입니다.' }]; // 401 추가예정
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, hash, check, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Auth_Sql_1["default"].Login(client)];
                    case 2:
                        hash = _a.sent();
                        if (!hash) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcrypt.compare(client.password, hash.password)];
                    case 3:
                        check = _a.sent();
                        return [2 /*return*/, { success: check, hash: hash }];
                    case 4: return [2 /*return*/, {
                            success: false
                        }];
                    case 5:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, { success: false }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.update_refresh_Token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, token, res_token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = this.body;
                        token = this.token;
                        return [4 /*yield*/, Auth_Sql_1["default"].UPDATE_Refresh_Token(id, token)];
                    case 1:
                        res_token = _a.sent();
                        // check 가 true면 Access , false면 Refresh
                        // const payload = jwt.decode(token, secret_key);
                        return [2 /*return*/, {
                                res_token: res_token,
                                success: true
                            }];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.name);
                        return [2 /*return*/, {
                                success: false
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
exports["default"] = Auth;
