import * as express from 'express';
import RegisterClass from './register.class';


const Register_request = {

    PostRegister: async (req : express.Request, res : express.Response) => {
        console.log(req.body)
        return res.json('ㅇㅋ');
        // const req_register = new RegisterClass(req.body);
        // const res_register = await req_register.register();
        // return res.json(res_register)
    },
}

export default Register_request;