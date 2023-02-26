import * as express from "express";
import RecordClass from "../services/record.service";

const Record_request = {
  PostRecord: async (req: express.Request, res: express.Response) => {
    try {
      const res_register = await RecordClass.save(req.body);
      return res.json(res_register);
    } catch (err) {
      return res.json({ success: false });
    }
  },

  GetRecord: async (req: express.Request, res: express.Response) => {
    try {
      const res_register = await RecordClass.get(req.body.id);
      return res.json(res_register);
    } catch (err) {
      return res.json({ success: false });
    }
  },

  UpdateRecord: async (req: express.Request, res: express.Response) => {
    const req_record = new RecordClass(req.body);
    const res_register = await req_record.update();
    return res.json(res_register);
  },

  DeleteRecord: async (req: express.Request, res: express.Response) => {
    const req_record = new RecordClass(req.body);
    const res_register = await req_record.delete();
    return res.json(res_register);
  },
};

export default Record_request;
