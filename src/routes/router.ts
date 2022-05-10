import express, { Request, Response, NextFunction } from 'express';
import register from '../controllers/register/register.ctrl'

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.post('/register', register.PostRegister);

export default router;