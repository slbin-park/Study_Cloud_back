"use strict";
import db from 'db_/db'
const bcrypt = require('bcrypt');
const saltRounds  = 10;

class RegisterSql {
    static async Register(userInfo : any) {
        return new Promise(async (resolve, reject) => {
            const hashing = await bcrypt.hash(userInfo.password, saltRounds);
            const query = "INSERT INTO User(id, password, name,school,major) VALUES(?, ?, ?, ?, ?);";
            db((conn : any)=>{
                conn.query(query,[userInfo.id,hashing,userInfo.name,userInfo.school,userInfo.major], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    static async Login(userInfo : any){
        return new Promise(async (resolve,reject) =>{
            const query = "SELECT * FROM User WHERE id = ?;"

            db((conn : any)=>{
                conn.query(query,[userInfo.id],(err : Error, data :any)=>{
                    if (err) reject(`${err}`);
                    resolve(data);
                }).then(()=>{
                    conn.release()
                })
            })
        })
    }
    
}

export default RegisterSql;