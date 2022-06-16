"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const record_ctrl_1 = __importDefault(require("../controllers/record/record.ctrl"));
const router = express_1.default.Router();
// 스케쥴 관련 요청을 scrouter로 이동
router.post('/save', record_ctrl_1.default.PostRecord);
router.post('/get', record_ctrl_1.default.GetRecord);
router.post('/update', record_ctrl_1.default.UpdateRecord);
router.post('/delete', record_ctrl_1.default.DeleteRecord);
exports.default = router;
