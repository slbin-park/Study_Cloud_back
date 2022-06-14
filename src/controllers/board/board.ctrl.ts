import * as express from 'express';
import BoardClass from './board.class';


const Board_request = {

    // 게시글 저장하기
    PostShare: async (req : express.Request, res : express.Response) => {
        const req_Board = new BoardClass(req.body);
        const res_Board = await req_Board.save_board();
        return res.json(res_Board)
    },

    // 게시글 불러오기
    GetShare: async (req : express.Request, res : express.Response) => {
        const req_Board = new BoardClass(req.body);
        const res_Board = await req_Board.get_board();
        return res.json(res_Board)
    },

    // 게시글 한개 불러오기
    GetOneBoard:async (req : express.Request, res : express.Response) => {
        const req_One_Board = new BoardClass(req);
        const res_One_Board = await req_One_Board.get_one_board();
        const res_Read_Noti = await req_One_Board.set_read_noti();
        const req_One_Record = new BoardClass(res_One_Board.board)
        const res_One_Record = await req_One_Record.get_one_share();
        return res.json(res_One_Record)
    },

    Getavg: async (req : express.Request, res : express.Response) => {
        const req_Board = new BoardClass(req);
        const res_Board = await req_Board.get_avg();
        return res.json(res_Board)
    },

    // 댓글 저장
    PostReply: async (req : express.Request, res : express.Response) => {
        const req_Reply = new BoardClass(req.body.data);
        const res_Reply = await req_Reply.save_reply();
        return res.json(res_Reply)
    },



    // 댓글 불러오기
    GetReply: async (req : express.Request, res : express.Response) => {
        const req_Reply = new BoardClass(req.body);
        const res_Reply = await req_Reply.get_reply();
        return res.json(res_Reply)
    },

    // 댓글 알림 불러오기
    GetNoti: async (req : express.Request , res : express.Response) => {
        const req_Noti = new BoardClass(req.body);
        const res_Noti = await req_Noti.get_noti();
        return res.json(res_Noti)
    }
}

export default Board_request;