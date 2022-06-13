import express, { Request, Response, NextFunction } from 'express';
import record from '../controllers/board/board.ctrl'

const router = express.Router();


router.post('/save_share', record.PostShare);
router.post('/get_board', record.GetShare);
router.get('/get-one-board/:id',record.GetOneBoard)

router.post('/save_reply', record.PostReply);
router.post('/get_reply', record.GetReply);

router.post('/get_noti',record.GetNoti);
router.post('/read_noti',record.GetNoti);



export default router;