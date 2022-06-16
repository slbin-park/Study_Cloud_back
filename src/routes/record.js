"use strict";
exports.__esModule = true;
var express_1 = require("express");
var record_ctrl_1 = require("../controllers/record/record.ctrl");
var router = express_1["default"].Router();
// 스케쥴 관련 요청을 scrouter로 이동
router.post('/save', record_ctrl_1["default"].PostRecord);
router.post('/get', record_ctrl_1["default"].GetRecord);
router.post('/update', record_ctrl_1["default"].UpdateRecord);
router.post('/delete', record_ctrl_1["default"].DeleteRecord);
exports["default"] = router;
