"use strict";
import db from 'db_/db'
const bcrypt = require('bcrypt');
const saltRounds  = 10;

class AuthSql {
    static async SELECT_Refresh_Token(tokeninfo : any) {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT refresh_token FROM User WHERE id = ? ;";
            db((conn : any)=>{
                conn.query(query,[tokeninfo.id,], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }
}

export default AuthSql;