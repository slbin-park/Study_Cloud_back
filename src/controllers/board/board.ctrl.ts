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

    // 댓글 저장
    PostReply: async (req : express.Request, res : express.Response) => {
        console.log(req.body.data)

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

}

export default Board_request;