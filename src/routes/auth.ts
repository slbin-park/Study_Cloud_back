import express, { Request, Response, NextFunction } from 'express';
import auth from '../models/Auth/Auth.ctrl';


const router = express.Router();


router.post('/create-refresh', auth.Create_Token);
// Refresh 토큰 생성

router.post('/compare-refresh',auth.CheckToken);
// Refresh 토큰 비교

router.post('/login',auth.Login);
// Login

export default router;