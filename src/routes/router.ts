import express, { Request, Response, NextFunction } from 'express';
import user from './user'
import auth from './auth'
import record from './record'
import board from './board'

const router = express();
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
router.use('/user', user);
router.use('/auth', auth);
router.use('/record', record);
router.use('/board', board);



export default router;