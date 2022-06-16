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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_class_1 = __importDefault(require("./board.class"));
const Board_request = {
    // 게시글 저장하기
    PostShare: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Board = new board_class_1.default(req.body);
        const res_Board = yield req_Board.save_board();
        return res.json(res_Board);
    }),
    // 게시글 불러오기
    GetShare: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Board = new board_class_1.default(req.body);
        const res_Board = yield req_Board.get_board();
        return res.json(res_Board);
    }),
    // 게시글 한개 불러오기
    GetOneBoard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_One_Board = new board_class_1.default(req);
        const res_One_Board = yield req_One_Board.get_one_board();
        const res_Read_Noti = yield req_One_Board.set_read_noti();
        const req_One_Record = new board_class_1.default(res_One_Board.board);
        const res_One_Record = yield req_One_Record.get_one_share();
        return res.json(res_One_Record);
    }),
    Getavg: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Board = new board_class_1.default(req);
        const res_Board = yield req_Board.get_avg();
        return res.json(res_Board);
    }),
    // 댓글 저장
    PostReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Reply = new board_class_1.default(req.body.data);
        const res_Reply = yield req_Reply.save_reply();
        return res.json(res_Reply);
    }),
    // 댓글 불러오기
    GetReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Reply = new board_class_1.default(req.body);
        const res_Reply = yield req_Reply.get_reply();
        return res.json(res_Reply);
    }),
    // 댓글 알림 불러오기
    GetNoti: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Noti = new board_class_1.default(req.body);
        const res_Noti = yield req_Noti.get_noti();
        return res.json(res_Noti);
    })
};
exports.default = Board_request;
