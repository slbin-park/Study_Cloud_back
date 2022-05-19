import express, { Request, Response, NextFunction } from 'express';
import auth from '../models/Auth/Auth.ctrl';


const router = express.Router();


router.post('/create-refresh', auth.Create_Token);
router.post('/compare-refresh',auth.CheckToken);

export default router;