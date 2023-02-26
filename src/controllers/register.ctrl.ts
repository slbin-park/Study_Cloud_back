import * as express from "express";
import RegisterDto from "src/dto/RegisterDto";
import RegisterClass from "../services/register.service";

const Register_request = {
  PostRegister: async (req: express.Request, res: express.Response) => {
    const res_register = await RegisterClass.register(req.body);
    return res.json(res_register);
  },

  PostLogin: async (req: express.Request, res: express.Response) => {
    const req_login = new RegisterClass(req.body);
  },
};

export default Register_request;
