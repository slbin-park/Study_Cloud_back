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
var Board_Sql_1 = require("db_sql/Board.Sql");
var Boardclass = /** @class */ (function () {
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    function Boardclass(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    //공유 데이터 저장
    Boardclass.prototype.save_board = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, check, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Board_Sql_1["default"].Check_board(client)];
                    case 2:
                        check = _a.sent();
                        if (check.length != 0) {
                            return [2 /*return*/, { success: false, msg: '이미 공유된 데이터입니다.' }];
                        }
                        return [4 /*yield*/, Board_Sql_1["default"].Save_board(client)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, { response: response, success: true }];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, { success: false }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //공유 데이터 불러오기
    Boardclass.prototype.get_board = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].Get_board(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { board: response, success: true }];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //공유 데이터 불러오기
    Boardclass.prototype.get_one_board = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].get_post_from_noti(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { board: response, success: true }];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Boardclass.prototype.set_read_noti = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].Set_read_noti(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { board: response, success: true }];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 해당 게시글 정보 불러오기
    Boardclass.prototype.get_one_share = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].get_record_from_share(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { board: response, success: true }];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 해당 게시글 정보 불러오기
    Boardclass.prototype.get_avg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, week, month, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Board_Sql_1["default"].get_avg_week(client)];
                    case 2:
                        week = _a.sent();
                        return [4 /*yield*/, Board_Sql_1["default"].get_avg_month(client)];
                    case 3:
                        month = _a.sent();
                        if (week.sum === null) {
                            week.st = 0;
                            week.et = 0;
                            week.avg = 0;
                            week.sum = 0;
                        }
                        if (month.sum === null) {
                            month.st = 0;
                            month.et = 0;
                            month.avg = 0;
                            month.sum = 0;
                        }
                        return [2 /*return*/, { week: week, month: month, success: true }];
                    case 4:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [2 /*return*/, { success: false }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //댓글 데이터 저장
    Boardclass.prototype.save_reply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, response_noti, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Board_Sql_1["default"].Save_reply(client)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, Board_Sql_1["default"].Save_noti(client)];
                    case 3:
                        response_noti = _a.sent();
                        return [2 /*return*/, { reply: response, noti: response_noti, success: true }];
                    case 4:
                        err_7 = _a.sent();
                        console.log(err_7);
                        return [2 /*return*/, { success: false }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //댓글 데이터 저장
    Boardclass.prototype.get_reply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].Get_reply(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { reply: response, success: true }];
                    case 3:
                        err_8 = _a.sent();
                        console.log(err_8);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //댓글 데이터 저장
    Boardclass.prototype.get_noti = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Board_Sql_1["default"].Get_noti(client)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, { reply: response, success: true }];
                    case 3:
                        err_9 = _a.sent();
                        console.log(err_9);
                        return [2 /*return*/, { success: false }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Boardclass;
}());
exports["default"] = Boardclass;
