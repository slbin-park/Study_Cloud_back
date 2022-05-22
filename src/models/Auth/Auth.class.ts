import "config/env"
import AuthSql from './Auth.Sql'
const bcrypt = require('bcrypt');
const saltRounds  = 10;

const jwt = require('jsonwebtoken');

class Auth{

    body : any;
    token : any;
    constructor(body : any , token :any = ''){
        this.body = body;
        this.token = token;
    }

    async create_Refresh_Token(){
        const info = this.body
        return new Promise( async (resolve,reject)=>{
            resolve( 
                jwt.sign(
                { 
                    'id' : info.id, 
                    'name' : info.name,
                    'major' : info.major,
                    'school' : info.school 
                },
                process.env.JWT_REFRESH_SECRET,
                
                 { //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
                expiresIn: "180days", // 토큰 유효시간 10분임
                }
              )
              )
        })
    }

    // Access Token 생성
    async create_Access_Token(){
        const  info = this.body
        console.log(info)
        return new Promise( async (resolve,reject)=>{
            resolve( 
                jwt.sign(
                { 
                    'id' : info.id, 
                    'name' : info.name,
                    'major' : info.major,
                    'school' : info.school 
                },
                
                process.env.JWT_ACCESS_SECRET,
                
                 { 
                //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
                expiresIn: "10m", // 토큰 유효시간 10분임
                }
              )
              )
        })
    }

    async checkToken(){
        try{
            const info = this.body
            const token = info.headers.authorization
            const secret_key = info.body.check ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET 
            console.log(secret_key)
            // check 가 true면 Access , false면 Refresh
            // const payload = jwt.decode(token, secret_key);
            return{
                token : jwt.verify(token,secret_key),success:true 
            }
        }
        catch(error : any){
            console.log(error.name);
            // 유효기간이 초과된 경우
            if (error.name === 'TokenExpiredError') {
              return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
            }
            // 토큰의 비밀키가 일치하지 않는 경우
            return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
        }
    }

    async check_refresh_Token(){
        try{
            const info = this.body
            const token = await AuthSql.SELECT_Refresh_Token(info);
            // check 가 true면 Access , false면 Refresh
            // const payload = jwt.decode(token, secret_key);
            return{
                token
            }
        }
        catch(error : any){
            console.log(error.name);
            // 유효기간이 초과된 경우
            if (error.name === 'TokenExpiredError') {
              return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
            }
            // 토큰의 비밀키가 일치하지 않는 경우
            return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
        }
    }

    async login(){
        const client = this.body;
        try{
            const hash : any = await AuthSql.Login(client);
            if(hash){
            const check = await bcrypt.compare(client.password,hash.password);
            return { success:check ,hash};
            }
            return {
                success : false
            }
        } catch (err){
            console.log(err)
            return { success:false }
        }
    }

    async update_refresh_Token(){
        try{
            const id = this.body
            const token = this.token
            const res_token = await AuthSql.UPDATE_Refresh_Token(id,token);
            // check 가 true면 Access , false면 Refresh
            // const payload = jwt.decode(token, secret_key);
            return{
                res_token,
                success : true
            }
        }
        catch(error : any){
            console.log(error.name);
            return {
                success: false 
            }; 
        }
    }

}

export default Auth;