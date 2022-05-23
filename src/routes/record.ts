import express, { Request, Response, NextFunction } from 'express';
import record from '../controllers/record/record.ctrl'

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.post('/save', record.PostRecord);
router.post('/get', record.GetRecord);


export default router;