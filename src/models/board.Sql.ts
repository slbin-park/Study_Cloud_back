"use strict";
import db from 'db_/db'
import moment from 'moment';

const bcrypt = require('bcrypt');
const saltRounds  = 10;

class BoardSql {
    static async Save_board(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_share(post_num,id,date) VALUES(?, ?, ?);";
            db((conn : any)=>{
                conn.query(query,[board.post_num,board.id,board.date], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    static async Get_board(board : any) {
    return new Promise(async (resolve, reject) => {
        const query = `
        SELECT * 
        FROM Study_share ss 
            INNER JOIN Study_record sr 
            ON ss.post_num = sr.post_num           
        `;
        db((conn : any)=>{
            conn.query(query,[], (err : any, data : any) =>{
                if (err) reject(`${err}`);
                resolve(data);
            });
            conn.release();
        })
    });
}
}

export default BoardSql;