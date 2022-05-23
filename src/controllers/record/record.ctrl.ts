import * as express from 'express';
import RecordClass from './record.class';


const Record_request = {

    PostRecord: async (req : express.Request, res : express.Response) => {
        const req_record = new RecordClass(req.body);
        const res_register = await req_record.save();
        return res.json(res_register)
    },
    
    GetRecord : async(req:express.Request,res:express.Response)=>{
        const req_record = new RecordClass(req.body);
        const res_register = await req_record.get();
        return res.json(res_register)
    },
}

export default Record_request;