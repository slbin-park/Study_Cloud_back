"use strict";
import {
  ISaveRecordRequestDto,
  IUpdateRecordRequestDto,
} from "src/dto/RecordRequestDto";
import { IGetRecordResponseDto } from "src/dto/RecordResponseDto";
import pool from "../database/db";
const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterSql {
  static async Save(record: ISaveRecordRequestDto) {
    const sql =
      "INSERT INTO Study_record(id, date, start_time,end_time,title,memo) VALUES(?, ?, ?, ?, ?,?);";
    const [rows, fields] = await pool.query(sql, [
      record.id,
      record.date,
      record.start_time,
      record.end_time,
      record.title,
      record.content,
    ]);
    return rows;
  }

  static async Get(id: string): Promise<IGetRecordResponseDto> {
    const sql = "SELECT * FROM Study_record WHERE id = ? ;";
    const [rows, fields] = await pool.query(sql, [id]);
    return rows;
  }

  static async Update(
    UpdateInfo: IUpdateRecordRequestDto
  ): Promise<IUpdateRecordRequestDto> {
    const sql =
      "UPDATE Study_record SET start_time = ? , end_time = ? , title = ? , memo = ? WHERE post_num = ? ;";
    const [rows, fields] = await pool.query(sql, [
      UpdateInfo.start_time,
      UpdateInfo.end_time,
      UpdateInfo.title,
      UpdateInfo.memo,
      UpdateInfo.post_num,
    ]);
    return rows;
  }

  static async Delete(info: any) {
    const sql = "DELETE FROM Study_record WHERE post_num = ?;";
    const [rows, fields] = await pool.query(sql, [info.post_num]);
    return rows;
  }
}

export default RegisterSql;
