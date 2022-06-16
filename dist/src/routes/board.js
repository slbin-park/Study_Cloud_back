"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_ctrl_1 = __importDefault(require("../controllers/board/board.ctrl"));
const router = express_1.default.Router();
router.post('/save_share', board_ctrl_1.default.PostShare);
router.post('/get_board', board_ctrl_1.default.GetShare);
router.get('/get-one-board/:id/:reply_id', board_ctrl_1.default.GetOneBoard);
router.get('/get-avg/:id/:date', board_ctrl_1.default.Getavg);
router.post('/save_reply', board_ctrl_1.default.PostReply);
router.post('/get_reply', board_ctrl_1.default.GetReply);
router.post('/get_noti', board_ctrl_1.default.GetNoti);
router.post('/read_noti', board_ctrl_1.default.GetNoti);
exports.default = router;
