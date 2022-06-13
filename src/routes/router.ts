import express, { Request, Response, NextFunction } from 'express';
import user from './user'
import auth from './auth'
import record from './record'
import board from './board'

const router = express();

// 스케쥴 관련 요청을 scrouter로 이동
router.use('/user', user);
router.use('/auth', auth);
router.use('/record', record);
router.use('/board', board);



export default router;