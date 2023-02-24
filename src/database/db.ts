import "../config/env";
const mysql = require("mysql"); // mysql 모듈 로드

function getConnection(callback: any) {
  const pool = mysql.createPool({
    // mysql 접속 설정
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  pool.getConnection((err: Error, conn: any) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      callback(conn);
    }
  });
}
export default getConnection;
