import express, { Request, Response, NextFunction } from 'express';
import record from '../controllers/board/board.ctrl'

const router = express.Router();


router.post('/save_share', record.PostShare);
router.post('/get_board', record.GetShare);

router.post('/save_reply', record.PostReply);



export default router;