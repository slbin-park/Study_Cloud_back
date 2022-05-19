import * as express from 'express';
import "config/env"
import Auth from './Auth.class';


const Auth_Request = {

    Create_Token : async (req : express.Request , res : express.Response) => {
        const req_Auth = new Auth(req.body)
        const res_Auth = await req_Auth.create_Refresh_Token()
        return res.json(res_Auth)
    },

    CheckToken : async (req:express.Request , res : express.Response)=>{
        const req_Auth = new Auth(req)
        // console.log(req)
        // console.log(req.headers)
        // http에 header정보를 담고있는것
        // authorization 에 토큰이 있음
        const res_Auth = await req_Auth.checkToken()
        return res.json(res_Auth)
    },
    
    Login : async (req:express.Request , res : express.Response)=>{
        const req_Auth = new Auth(req.body)
        const res_Auth = await req_Auth.login()
        console.log(res_Auth)
        const req_Refresh_token = new Auth(res_Auth)
        const res_Refresh_token = await req_Refresh_token.create_Refresh_Token()
        const res_Access_token  = await req_Refresh_token.create_Access_Token()
        
        return res.json({
            refresh_token : res_Refresh_token,
            access_token  : res_Access_token
        })

    }

}
export default Auth_Request;