"use strict";
import { ILoginRequestDto } from "src/dto/AuthRequestDto";
import pool from "../../database/db";

class AuthSql {
  static async SELECT_Refresh_Token(tokeninfo: any) {
    const sql = "SELECT refresh_token FROM User WHERE id = ? ;";
    const [rows, fields] = await pool.query(sql, [tokeninfo.id]);
    return rows;
  }

  static async UPDATE_Refresh_Token(id: string, token: string) {
    const sql = "UPDATE User SET refresh_token = (?) WHERE id = (?) ;";
    const [rows, fields] = await pool.query(sql, [token, id]);
    return rows;
  }

  static async Login(userInfo: ILoginRequestDto) {
    const sql = "SELECT * FROM User WHERE id = ?;";
    const [rows, fields] = await pool.query(sql, [userInfo.id]);
    return rows[0];
  }
}

export default AuthSql;
