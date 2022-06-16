"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Auth_ctrl_1 = require("../models/Auth/Auth.ctrl");
var router = express_1["default"].Router();
router.post('/create-refresh', Auth_ctrl_1["default"].Create_Token);
// Refresh 토큰 생성
router.post('/compare-refresh', Auth_ctrl_1["default"].Check_Token);
// Refresh 토큰 비교
router.post('/login', Auth_ctrl_1["default"].Login);
// Login
router.post('/check-refresh', Auth_ctrl_1["default"].Check_Refresh_Token);
// refresh 토큰 체크
exports["default"] = router;
