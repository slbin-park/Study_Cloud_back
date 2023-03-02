import "../config/env";
import * as mysql from "mysql2";

const pool = mysql.createPool({
  // mysql 접속 설정
  host: process.env.HOST,
  port: process.env.DBPORT as unknown as number,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default pool.promise();
