import * as express from 'express';
import BoardClass from './board.class';


const Board_request = {

    PostShare: async (req : express.Request, res : express.Response) => {
        const req_Board = new BoardClass(req.body);
        const res_Board = await req_Board.save();
        return res.json(res_Board)
    },
    GetShare: async (req : express.Request, res : express.Response) => {
        const req_Board = new BoardClass(req.body);
        const res_Board = await req_Board.get();
        return res.json(res_Board)
    },
}

export default Board_request;