"use strict";
exports.__esModule = true;
var express_1 = require("express");
var register_ctrl_1 = require("../controllers/register/register.ctrl");
var router = express_1["default"].Router();
// 스케쥴 관련 요청을 scrouter로 이동
router.post('/register', register_ctrl_1["default"].PostRegister);
exports["default"] = router;
