"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_ctrl_1 = __importDefault(require("../controllers/register/register.ctrl"));
const router = express_1.default.Router();
// 스케쥴 관련 요청을 scrouter로 이동
router.post('/register', register_ctrl_1.default.PostRegister);
exports.default = router;
