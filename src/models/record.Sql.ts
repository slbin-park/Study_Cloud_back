"use strict";
import db from 'db_/db'
const bcrypt = require('bcrypt');
const saltRounds  = 10;

class RegisterSql {
    static async Save(record : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_record(id, date, start_time,end_time,title,memo) VALUES(?, ?, ?, ?, ?,?);";
            db((conn : any)=>{
                conn.query(query,[record.id,record.date,record.start_time,record.end_time,record.title,record.content], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    static async Get(info : any) {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM Study_record WHERE id = ? ;";
            db((conn : any)=>{
                conn.query(query,[info.id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    
    
}

export default RegisterSql;