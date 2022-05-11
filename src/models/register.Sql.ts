"use strict";
import db from 'db_/db'

class RegisterSql {
    static async gettest(userInfo : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO User(id, password, name,school,major) VALUES(?, ?, ?, ?, ?);";
            db.query(query,[userInfo.id,userInfo.password,userInfo.name,userInfo.school,userInfo.major], (err : any, data : any) =>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}

export default RegisterSql;