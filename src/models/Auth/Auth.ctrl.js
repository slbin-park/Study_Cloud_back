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
var Auth_class_1 = require("./Auth.class");
var Auth_Request = {
    Create_Token: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Auth, res_Auth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Auth = new Auth_class_1["default"](req.body);
                    return [4 /*yield*/, req_Auth.create_Refresh_Token()];
                case 1:
                    res_Auth = _a.sent();
                    return [2 /*return*/, res.json(res_Auth)];
            }
        });
    }); },
    Check_Token: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Auth, res_Auth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Auth = new Auth_class_1["default"](req.body);
                    return [4 /*yield*/, req_Auth.checkToken()
                        // 이건 treu false만 반환함 
                    ];
                case 1:
                    res_Auth = _a.sent();
                    // 이건 treu false만 반환함 
                    return [2 /*return*/, res_Auth.success];
            }
        });
    }); },
    Check_Refresh_Token: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Auth, res_Auth, req_tokn, res_token, req_Access_token, res_Access_token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Auth = new Auth_class_1["default"](req);
                    return [4 /*yield*/, req_Auth.checkToken()
                        // 토큰이 유효하면
                    ];
                case 1:
                    res_Auth = _a.sent();
                    if (!res_Auth.success) return [3 /*break*/, 5];
                    req_tokn = new Auth_class_1["default"](res_Auth.token);
                    return [4 /*yield*/, req_tokn.check_refresh_Token()];
                case 2:
                    res_token = _a.sent();
                    if (!(req.headers.authorization === res_token.token)) return [3 /*break*/, 4];
                    req_Access_token = new Auth_class_1["default"](res_Auth.token);
                    return [4 /*yield*/, req_Access_token.create_Access_Token()];
                case 3:
                    res_Access_token = _a.sent();
                    return [2 /*return*/, res.json({
                            access_token: res_Access_token,
                            id: res_Auth.token.id,
                            name: res_Auth.token.name,
                            school: res_Auth.token.school,
                            major: res_Auth.token.major
                        })];
                case 4: 
                // 같을경우 Access를 리턴해준다.
                // 같을 경우 res_token 안에 있는 데이터로 Access를 만들어서 준다.
                return [2 /*return*/, res.json({
                        success: false,
                        msg: '유효하지 않은 토큰입니다.'
                    })];
                case 5: 
                // 이건 treu false만 반환함 
                return [2 /*return*/, res.json(res_Auth.success)];
            }
        });
    }); },
    Login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Auth, res_Auth, req_Refresh_token, res_Refresh_token, res_Access_token, req_Update_token, res_Update_token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Auth = new Auth_class_1["default"](req.body);
                    return [4 /*yield*/, req_Auth.login()
                        // res_Auth.success  결과
                    ];
                case 1:
                    res_Auth = _a.sent();
                    // res_Auth.success  결과
                    if (!res_Auth.success) {
                        return [2 /*return*/, res.json({
                                success: false
                            })];
                    }
                    req_Refresh_token = new Auth_class_1["default"](res_Auth.hash);
                    return [4 /*yield*/, req_Refresh_token.create_Refresh_Token()
                        // Refresh token 생성
                    ];
                case 2:
                    res_Refresh_token = _a.sent();
                    return [4 /*yield*/, req_Refresh_token.create_Access_Token()
                        // Access token 생성
                        // 쿼리에 Refresh token 업데이트
                    ];
                case 3:
                    res_Access_token = _a.sent();
                    req_Update_token = new Auth_class_1["default"](res_Auth.hash.id, res_Refresh_token);
                    return [4 /*yield*/, req_Update_token.update_refresh_Token()];
                case 4:
                    res_Update_token = _a.sent();
                    return [2 /*return*/, res.json({
                            refresh_token: res_Refresh_token,
                            access_token: res_Access_token,
                            success: res_Update_token.success,
                            id: res_Auth.hash.id,
                            name: res_Auth.hash.name,
                            school: res_Auth.hash.school,
                            major: res_Auth.hash.major
                        })];
            }
        });
    }); }
};
exports["default"] = Auth_Request;
