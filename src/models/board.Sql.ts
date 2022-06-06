"use strict";
import db from 'db_/db'
const bcrypt = require('bcrypt');
const saltRounds  = 10;

class BoardSql {
    static async Save(record : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_share(post_num,id,date) VALUES(?, ?, ?);";
            db((conn : any)=>{
                conn.query(query,[record.id,record.date,record.start_time,record.end_time,record.title,record.content], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }
}

export default BoardSql;