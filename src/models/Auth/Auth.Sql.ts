"use strict";
import db from "../../database/db";

class AuthSql {
  static async SELECT_Refresh_Token(tokeninfo: any) {
    return new Promise(async (resolve, reject) => {
      const query = "SELECT refresh_token FROM User WHERE id = ? ;";
      db((conn: any) => {
        conn.query(query, [tokeninfo.id], (err: any, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data[0].refresh_token);
        });
      });
    });
  }

  static async UPDATE_Refresh_Token(id: string, token: string) {
    return new Promise(async (resolve, reject) => {
      const query = "UPDATE User SET refresh_token = (?) WHERE id = (?) ;";
      db((conn: any) => {
        conn.query(query, [token, id], (err: any, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data);
        });
      });
    });
  }

  static async Login(userInfo: any) {
    return new Promise(async (resolve, reject) => {
      const query = "SELECT * FROM User WHERE id = ?;";
      db((conn: any) => {
        conn.query(query, [userInfo.id], (err: Error, data: any) => {
          conn.release();
          if (err) reject(`${err}`);
          resolve(data[0]);
          // 하나만 선택할 경우 0 번째로 선택해서 넘겨줘야함
        });
      });
    });
  }
}

export default AuthSql;
