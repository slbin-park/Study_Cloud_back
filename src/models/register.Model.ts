"use strict";
import db from "../database/db";

const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterSql {
  static async Register(userInfo: any) {
    return new Promise(async (resolve, reject) => {
      const hashing = await bcrypt.hash(userInfo.password, saltRounds);
      const query =
        "INSERT INTO User(id, password, name,school,major) VALUES(?, ?, ?, ?, ?);";
      db((conn: any) => {
        conn.query(
          query,
          [
            userInfo.id,
            hashing,
            userInfo.name,
            userInfo.school,
            userInfo.major,
          ],
          (err: any, data: any) => {
            conn.release();
            if (err) reject(`${err}`);
            resolve(data);
          }
        );
      });
    });
  }
}

export default RegisterSql;
