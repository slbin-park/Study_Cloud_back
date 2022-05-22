import * as express from 'express';
import "config/env"
import Auth from './Auth.class';


const Auth_Request = {

    Create_Token : async (req : express.Request , res : express.Response) => {
        const req_Auth = new Auth(req.body)
        const res_Auth = await req_Auth.create_Refresh_Token()
        return res.json(res_Auth)
    },

    Check_Token : async (req:express.Request , res : express.Response)=>{
        // 필요한 정보
        // token : token정보
        // check : true 면 Access false면 Refresh
        const req_Auth = new Auth(req.body)
        
        // console.log(req)
        // console.log(req.headers)

        const res_Auth = await req_Auth.checkToken()
        // 이건 treu false만 반환함 
        return res_Auth.success
    },

    Check_Refresh_Token : async (req:express.Request , res : express.Response)=>{
        // 필요한 정보
        // token : token정보
        // check : true 면 Access false면 Refresh
        const req_Auth = new Auth(req)
        
        // console.log(req)
        const res_Auth = await req_Auth.checkToken()
        console.log(res_Auth)
        // 토큰이 유효하면
        if(res_Auth.success){
            const req_tokn = new Auth(res_Auth.token)
            const res_token = await req_tokn.check_refresh_Token()
            console.log('토큰 ')
            if (req.headers.authorization === res_token.token){
                console.log('일치')
                const req_Access_token = new Auth(res_Auth.token)
                const res_Access_token = await req_Access_token.create_Access_Token()
                return res.json({
                    token : res_Access_token,
                    id : res_Auth.token.id,
                    name : res_Auth.token.name,
                    school : res_Auth.token.school,
                    major : res_Auth.token.major,
                })
            }
            // 같을경우 Access를 리턴해준다.
            // 같을 경우 res_token 안에 있는 데이터로 Access를 만들어서 준다.
            return res.json({
                success : false,
                msg : '유효하지 않은 토큰입니다.'
            })

        }
        // 이건 treu false만 반환함 
        return res.json(res_Auth.success)
    },

    
    Login : async (req:express.Request , res : express.Response)=>{
        const req_Auth = new Auth(req.body)
        const res_Auth = await req_Auth.login()
        console.log('res_Auth hash')
        console.log(res_Auth)
        // res_Auth.success  결과
        if(!res_Auth.success){
            return res.json({
                success : false,
            })
        }
        
        //토큰 생성
        const req_Refresh_token = new Auth(res_Auth.hash)
        const res_Refresh_token = await req_Refresh_token.create_Refresh_Token()
        // Refresh token 생성
        const res_Access_token  = await req_Refresh_token.create_Access_Token()
        // Access token 생성

        // 쿼리에 Refresh token 업데이트
        const req_Update_token = new Auth(res_Auth.hash.id,res_Refresh_token)
        const res_Update_token = await req_Update_token.update_refresh_Token()

        return res.json({
            refresh_token : res_Refresh_token,
            access_token  : res_Access_token,
            success : res_Update_token.success,
            id : res_Auth.hash.id,
            name : res_Auth.hash.name,
            school : res_Auth.hash.school,
            major : res_Auth.hash.major,
        })

    }

}

export default Auth_Request;