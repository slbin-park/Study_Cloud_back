"use strict";
import db from 'db_/db'
import moment from 'moment';

const bcrypt = require('bcrypt');
const saltRounds  = 10;

class BoardSql {
    static async Save_board(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_share(post_num,id,share_date) VALUES(?, ?, ?);";
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
            const user = '`User`';
            const reply = '`reply_board_num`';
            const query = `
            SELECT sr.start_time , sr.end_time , sr.title , sr.memo , ss.board_num , ss.share_date , u.id , u.name,
            (
            SELECT count(*)
            FROM Study_share_reply
            WHERE Study_share_reply.${reply} = ss.board_num 
            ) AS cnt
            FROM Study_share ss 
            INNER JOIN Study_record sr 
            ON ss.post_num = sr.post_num 
            INNER JOIN ${user} u 
            ON ss.id = u.id;
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

    static async Check_board(board : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const query = `
            SELECT *
            FROM Study_share
            WHERE post_num = ?
            `;
            db((conn : any)=>{
                conn.query(query,[board.post_num], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    static async Save_reply(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_share_reply(`reply_board_num`,id,reply,reply_date) VALUES(?, ?, ?, ?);";
            db((conn : any)=>{
                conn.query(query,[board.board_num,board.id,board.reply,board.date], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    static async Get_reply(reply : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const board_num ='`reply_board_num`';
            const query = `
            SELECT ssr.id , ssr.reply ,ssr.reply_date , u.name 
                FROM ${user} u 
                INNER JOIN Study_share_reply ssr 
                ON u.id = ssr.id 
                WHERE ssr.${board_num}  = (?);
                `;
            db((conn : any)=>{
                conn.query(query,[reply.board_num], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

    // 알림 저장
    static async Save_noti(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO reply_notifi(`userid` , replyid , created_at , read_at , reply , noti_num) VALUES(?, ?, ?, ? , ? , ?);";
            db((conn : any)=>{
                conn.query(query,[board.userid ,board.id , board.date , null , board.reply , board.board_num], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

}

export default BoardSql;


// 평균 공부시간 쿼리
// SELECT AVG(Md.Mdiff)
// FROM (
// SELECT TIMESTAMPDIFF(MINUTE,sr.start_time,sr.end_time) AS Mdiff 
// FROM Study_record sr 
// WHERE sr.id = 'smpts00') Md;

// 댓글 알림 쿼리
// SELECT rn.* , sr.title
// FROM reply_notifi as rn
// INNER JOIN Study_share ss 
// ON rn.noti_num = ss.board_num
// INNER JOIN Study_record sr
// ON sr.post_num  = ss.post_num 
// WHERE rn.userid = 'smpts00' 
// AND rn.read_at IS NULL