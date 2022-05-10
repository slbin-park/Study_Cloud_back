"use strict";
import db from 'db_/db'

class RegisterSql {
    static async gettest(user : any) {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM test ;";
            db.query(query, (err : any, data : any) =>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}

export default RegisterSql;