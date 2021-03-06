"use strict";
import db from '../database/db'

import moment from 'moment';



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
            const reply = 'reply_board_num';
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


    static async get_post_from_noti(board : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const query = `
            SELECT *
            FROM Study_share
            WHERE board_num = (?)
            `;
            db((conn : any)=>{
                conn.query(query,[board.params.id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data[0]);
                });
                conn.release();
            })
        });
    }
    
    static async Set_read_noti(board : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const query = `
            UPDATE reply_notifi SET read_at = NOW() WHERE reply_id = (?) ;
            `;
            db((conn : any)=>{
                conn.query(query,[board.params.reply_id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }


    static async get_record_from_share(board : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const query = `
            SELECT *
            FROM Study_record
            WHERE post_num = (?)
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

    // ?????? ?????? ?????????
    static async get_avg_week(board : any) {
        return new Promise(async (resolve, reject) => {
            const user = '`User`';
            const q_date = "`date`";
            const q_get_date = board.params.date;
            const query = `
            SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(start_time))) as st,
            SEC_TO_TIME(AVG(TIME_TO_SEC(end_time))) as et,
            AVG(TIMESTAMPDIFF(MINUTE,start_time,end_time)) as avg,
            SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) as sum,
            WEEK((?),5) - 
            WEEK(DATE_SUB((?),INTERVAL DAYOFMONTH((?))-1 DAY),5) + 1 as week
            FROM Study_record
            WHERE
            WEEK(${q_date},5) - 
            WEEK(DATE_SUB(${q_date},INTERVAL DAYOFMONTH(${q_date})-1 DAY),5) + 1
            =
            WEEK((?),5) - 
            WEEK(DATE_SUB((?),INTERVAL DAYOFMONTH((?))-1 DAY),5) + 1
            AND
            MONTH(${q_date})
            =
            MONTH(?)
            AND
            id = (?)
            `;
            db((conn : any)=>{
                conn.query(query,[q_get_date ,q_get_date ,q_get_date ,q_get_date , q_get_date, q_get_date, q_get_date,board.params.id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data[0]);
                });
                conn.release();
            })
        });
    }

    static async get_avg_month(board : any) {
        return new Promise(async (resolve, reject) => {
            const q_date = "`date`";
            const query = `
            SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(start_time))) as st,
            SEC_TO_TIME(AVG(TIME_TO_SEC(end_time))) as et,
            AVG(TIMESTAMPDIFF(MINUTE,start_time,end_time)) as avg,
            SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) as sum,
            MONTH(?) as month
            FROM Study_record
            WHERE
            MONTH(${q_date})
            =
            MONTH(?)
            AND
            id = (?)
            `;
            db((conn : any)=>{
                conn.query(query,[board.params.date,board.params.date ,board.params.id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data[0]);
                });
                conn.release();
            })
        });
    }

    static async Save_reply(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = "INSERT INTO Study_share_reply(reply_board_num,id,reply,reply_date) VALUES(?, ?, ?, ?);";
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
            const board_num ='reply_board_num';
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

    // ?????? ??????
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

    // ?????? ??????
    static async Get_noti(board : any) {
        return new Promise(async (resolve, reject) => {
            const query = `
            SELECT rn.* , sr.title
            FROM reply_notifi as rn
            INNER JOIN Study_share ss 
            ON rn.noti_num = ss.board_num
            INNER JOIN Study_record sr
            ON sr.post_num  = ss.post_num 
            WHERE rn.userid = ?
            AND rn.read_at IS NULL
            `;
            db((conn : any)=>{
                conn.query(query,[board.id], (err : any, data : any) =>{
                    if (err) reject(`${err}`);
                    resolve(data);
                });
                conn.release();
            })
        });
    }

}

export default BoardSql;


// ?????? ???????????? ??????
// SELECT AVG(Md.Mdiff)
// FROM (
// SELECT TIMESTAMPDIFF(MINUTE,sr.start_time,sr.end_time) AS Mdiff 
// FROM Study_record sr 
// WHERE sr.id = 'smpts00') Md;

// ?????? ?????? ??????
// SELECT rn.* , sr.title
// FROM reply_notifi as rn
// INNER JOIN Study_share ss 
// ON rn.noti_num = ss.board_num
// INNER JOIN Study_record sr
// ON sr.post_num  = ss.post_num 
// WHERE rn.userid = 'smpts00' 
// AND rn.read_at IS NULL

// ?????? ???????????? ?????????
// SELECT SEC_TO_TIME(avg(TIME_TO_SEC(start_time))) as avg_time
// FROM Study_record  
