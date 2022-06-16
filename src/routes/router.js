"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_1 = require("./user");
var auth_1 = require("./auth");
var record_1 = require("./record");
var board_1 = require("./board");
var router = (0, express_1["default"])();
/**
 * @swagger
 *  /product:
 *    get:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
// 스케쥴 관련 요청을 scrouter로 이동
router.use('/user', user_1["default"]);
router.use('/auth', auth_1["default"]);
router.use('/record', record_1["default"]);
router.use('/board', board_1["default"]);
exports["default"] = router;
