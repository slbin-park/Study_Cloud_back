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
var board_class_1 = require("./board.class");
var Board_request = {
    // 게시글 저장하기
    PostShare: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Board, res_Board;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Board = new board_class_1["default"](req.body);
                    return [4 /*yield*/, req_Board.save_board()];
                case 1:
                    res_Board = _a.sent();
                    return [2 /*return*/, res.json(res_Board)];
            }
        });
    }); },
    // 게시글 불러오기
    GetShare: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Board, res_Board;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Board = new board_class_1["default"](req.body);
                    return [4 /*yield*/, req_Board.get_board()];
                case 1:
                    res_Board = _a.sent();
                    return [2 /*return*/, res.json(res_Board)];
            }
        });
    }); },
    // 게시글 한개 불러오기
    GetOneBoard: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_One_Board, res_One_Board, res_Read_Noti, req_One_Record, res_One_Record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_One_Board = new board_class_1["default"](req);
                    return [4 /*yield*/, req_One_Board.get_one_board()];
                case 1:
                    res_One_Board = _a.sent();
                    return [4 /*yield*/, req_One_Board.set_read_noti()];
                case 2:
                    res_Read_Noti = _a.sent();
                    req_One_Record = new board_class_1["default"](res_One_Board.board);
                    return [4 /*yield*/, req_One_Record.get_one_share()];
                case 3:
                    res_One_Record = _a.sent();
                    return [2 /*return*/, res.json(res_One_Record)];
            }
        });
    }); },
    Getavg: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Board, res_Board;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Board = new board_class_1["default"](req);
                    return [4 /*yield*/, req_Board.get_avg()];
                case 1:
                    res_Board = _a.sent();
                    return [2 /*return*/, res.json(res_Board)];
            }
        });
    }); },
    // 댓글 저장
    PostReply: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Reply, res_Reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Reply = new board_class_1["default"](req.body.data);
                    return [4 /*yield*/, req_Reply.save_reply()];
                case 1:
                    res_Reply = _a.sent();
                    return [2 /*return*/, res.json(res_Reply)];
            }
        });
    }); },
    // 댓글 불러오기
    GetReply: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Reply, res_Reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Reply = new board_class_1["default"](req.body);
                    return [4 /*yield*/, req_Reply.get_reply()];
                case 1:
                    res_Reply = _a.sent();
                    return [2 /*return*/, res.json(res_Reply)];
            }
        });
    }); },
    // 댓글 알림 불러오기
    GetNoti: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_Noti, res_Noti;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_Noti = new board_class_1["default"](req.body);
                    return [4 /*yield*/, req_Noti.get_noti()];
                case 1:
                    res_Noti = _a.sent();
                    return [2 /*return*/, res.json(res_Noti)];
            }
        });
    }); }
};
exports["default"] = Board_request;
