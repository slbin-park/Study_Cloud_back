"use strict";
import RegisterDto from "src/dto/RegisterRequestDto";
import pool from "../database/db";

const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterSql {
  static async Register(userInfo: RegisterDto) {
    const hashing = await bcrypt.hash(userInfo.password, saltRounds);
    const sql =
      "INSERT INTO User(id, password, name,school,major) VALUES(?, ?, ?, ?, ?);";
    const [rows, fields] = await pool.query(sql, [
      userInfo.id,
      hashing,
      userInfo.name,
      userInfo.school,
      userInfo.major,
    ]);
    return rows;
  }
}

export default RegisterSql;
