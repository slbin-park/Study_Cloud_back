import * as express from "express";
import RegisterClass from "../services/register.service";

const Register_request = {
  PostRegister: async (req: express.Request, res: express.Response) => {
    // bcrypt hash() 함수로 비밀번호를 암호화함
    const req_register = new RegisterClass(req.body);
    const res_register = await req_register.register();
    return res.json(res_register);
    // return res.json('asdf')
  },

  PostLogin: async (req: express.Request, res: express.Response) => {
    const req_login = new RegisterClass(req.body);
  },
};

export default Register_request;
