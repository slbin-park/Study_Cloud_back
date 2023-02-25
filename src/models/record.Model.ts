"use strict";
import db from "../database/db";
const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterSql {
  static async Save(record: any) {
    return new Promise(async (resolve, reject) => {
      const query =
        "INSERT INTO Study_record(id, date, start_time,end_time,title,memo) VALUES(?, ?, ?, ?, ?,?);";
      db((conn: any) => {
        conn.query(
          query,
          [
            record.id,
            record.date,
            record.start_time,
            record.end_time,
            record.title,
            record.content,
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

  static async Get(info: any) {
    return new Promise(async (resolve, reject) => {
      const query = "SELECT * FROM Study_record WHERE id = ? ;";
      db((conn: any) => {
        conn.query(query, [info.id], (err: any, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data);
        });
      });
    });
  }

  static async Update(info: any) {
    return new Promise(async (resolve, reject) => {
      const query =
        "UPDATE Study_record SET start_time = ? , end_time = ? , title = ? , memo = ? WHERE post_num = ? ;";
      db((conn: any) => {
        conn.query(
          query,
          [
            info.start_time,
            info.end_time,
            info.title,
            info.memo,
            info.post_num,
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

  static async Delete(info: any) {
    return new Promise(async (resolve, reject) => {
      const query = "DELETE FROM Study_record WHERE post_num = ?;";
      db((conn: any) => {
        conn.query(query, [info.post_num], (err: any, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data);
        });
      });
    });
  }
}

export default RegisterSql;
