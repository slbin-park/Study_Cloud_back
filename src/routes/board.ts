import express, { Request, Response, NextFunction } from 'express';
import record from '../controllers/board/board.ctrl'

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.post('/share', record.PostShare);




export default router;