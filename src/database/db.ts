import { ConnectionOptions } from "tls";
import "../config/env"
const mysql = require('mysql');  // mysql 모듈 로드
const pool = mysql.createPool({  // mysql 접속 설정
    host: process.env.HOST, 
    port: process.env.DBPORT, 
    user: process.env.NAME, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE 
});

function getConnection(callback : any){
    pool.getConnection((err : Error ,conn : any)=>{
        if(!err){
            callback(conn);
        }
    })
}
export default getConnection;