"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const record_1 = __importDefault(require("./record"));
const board_1 = __importDefault(require("./board"));
const router = (0, express_1.default)();
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
router.use('/user', user_1.default);
router.use('/auth', auth_1.default);
router.use('/record', record_1.default);
router.use('/board', board_1.default);
exports.default = router;
