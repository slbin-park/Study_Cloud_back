"use strict";
import {
  ISaveRecordRequestDto,
  IUpdateRecordRequestDto,
} from "src/dto/RecordRequestDto";
import { IGetRecordResponseDto } from "src/dto/RecordResponseDto";
import db from "../database/db";
const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterSql {
  static async Save(record: ISaveRecordRequestDto) {
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

  static async Get(id: string): Promise<IGetRecordResponseDto> {
    return new Promise(async (resolve, reject) => {
      const query = "SELECT * FROM Study_record WHERE id = ? ;";
      db((conn: any) => {
        conn.query(query, [id], (err: any, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data);
        });
      });
    });
  }

  static async Update(
    UpdateInfo: IUpdateRecordRequestDto
  ): Promise<IUpdateRecordRequestDto> {
    return new Promise(async (resolve, reject) => {
      const query =
        "UPDATE Study_record SET start_time = ? , end_time = ? , title = ? , memo = ? WHERE post_num = ? ;";
      db((conn: any) => {
        conn.query(
          query,
          [
            UpdateInfo.start_time,
            UpdateInfo.end_time,
            UpdateInfo.title,
            UpdateInfo.memo,
            UpdateInfo.post_num,
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
