import "config/env"
const mysql = require('mysql');  // mysql 모듈 로드
const conn = mysql.createConnection({  // mysql 접속 설정
    host: process.env.HOST, 
    port: process.env.PORT, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE 
});
export default conn;