import {
  IGetAvgResponseDto,
  IGetReplyResponseDto,
} from "src/dto/BoardResponseDto";
import pool from "../database/db";

class BoardSql {
  static async Save_board(board: any) {
    const sql =
      "INSERT INTO Study_share(post_num,id,share_date) VALUES(?, ?, ?);";
    const [rows, fields] = await pool.query(sql, [
      board.post_num,
      board.id,
      board.date,
    ]);
    return rows;
  }

  static async Get_board(board: any) {
    const user = "`User`";
    const reply = "reply_board_num";
    const sql = `
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
    const [rows, fields] = await pool.query(sql);
    return rows;
  }

  static async Check_board(board: any) {
    const user = "`User`";
    const sql = `
          SELECT *
          FROM Study_share
          WHERE post_num = ?
          `;
    const [rows, fields] = await pool.query(sql, [board.post_num]);
    return rows;
  }

  static async get_post_from_noti(id: any): Promise<Number> {
    const user = "`User`";
    const sql = `
          SELECT *
          FROM Study_share
          WHERE board_num = (?)
          `;
    const [rows, fields] = await pool.query(sql, [id]);
    return rows;
  }

  static async Set_read_noti(reply_id: any) {
    const user = "`User`";
    const sql = `
          UPDATE reply_notifi SET read_at = NOW() WHERE reply_id = (?) ;
          `;
    const [rows, fields] = await pool.query(sql, [reply_id]);
    return rows;
  }

  static async get_record_from_share(board_id: any) {
    const user = "`User`";
    const sql = `
          SELECT *
          FROM Study_record
          WHERE post_num = (?)
          `;
    const [rows, fields] = await pool.query(sql);
    return rows;
  }

  // 주차 평균 구하기
  static async get_avg_week(board: any): Promise<IGetAvgResponseDto> {
    const user = "`User`";
    const q_date = "`date`";
    const q_get_date = board.params.date;
    const sql = `
          SELECT IFNULL ( SEC_TO_TIME(AVG(TIME_TO_SEC(start_time))) , '00:00:00:0000' ) as st,
          IFNULL( SEC_TO_TIME(AVG(TIME_TO_SEC(end_time))) , '00:00:00:0000' ) as et,
          IFNULL( AVG(TIMESTAMPDIFF(MINUTE,start_time,end_time)) , 0 ) as avg,
          IFNULL( SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) , 0 ) as sum,
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
    const [rows, fields] = await pool.query(sql, [
      q_get_date,
      q_get_date,
      q_get_date,
      q_get_date,
      q_get_date,
      q_get_date,
      q_get_date,
      board.params.id,
    ]);
    return rows[0];
  }

  static async get_avg_month(board: any): Promise<IGetAvgResponseDto> {
    const q_date = "`date`";
    const sql = `
          SELECT IFNULL(SEC_TO_TIME(AVG(TIME_TO_SEC(start_time)))  ,'00:00:00:0000') as st,
          IFNULL( SEC_TO_TIME(AVG(TIME_TO_SEC(end_time))) ,'00:00:00:0000') as et,
          IFNULL( AVG(TIMESTAMPDIFF(MINUTE,start_time,end_time)) , 0 ) as avg,
          IFNULL( SUM(TIMESTAMPDIFF(MINUTE,start_time,end_time)) ,0 ) as sum,
          MONTH(?) as month
          FROM Study_record
          WHERE
          MONTH(${q_date})
          =
          MONTH(?)
          AND
          id = (?)
          `;
    const [rows, fields] = await pool.query(sql, [
      board.params.date,
      board.params.date,
      board.params.id,
    ]);
    return rows[0];
  }

  static async Save_reply(board: any) {
    const sql =
      "INSERT INTO Study_share_reply(reply_board_num,id,reply,reply_date) VALUES(?, ?, ?, ?);";

    const [rows, fields] = await pool.query(sql, [
      board.board_num,
      board.id,
      board.reply,
      board.date,
    ]);
    return rows;
  }

  static async Get_reply(boardNum: number): Promise<IGetReplyResponseDto[]> {
    const user = "`User`";
    const board_num = "reply_board_num";
    const sql = `
          SELECT ssr.id , ssr.reply ,ssr.reply_date , u.name 
              FROM ${user} u 
              INNER JOIN Study_share_reply ssr 
              ON u.id = ssr.id 
              WHERE ssr.${board_num}  = (?);
              `;
    const [rows, fields] = await pool.query(sql, [boardNum]);
    return rows;
  }

  // 알림 저장
  static async Save_noti(board: any) {
    const sql =
      "INSERT INTO reply_notifi(`userid` , replyid , created_at , read_at , reply , noti_num) VALUES(?, ?, ?, ? , ? , ?);";
    const [rows, fields] = await pool.query(sql, [
      board.userid,
      board.id,
      board.date,
      null,
      board.reply,
      board.board_num,
    ]);
    return rows;
  }

  // 알림 저장
  static async Get_noti(board: any) {
    const sql = `
          SELECT rn.* , sr.title
          FROM reply_notifi as rn
          INNER JOIN Study_share ss 
          ON rn.noti_num = ss.board_num
          INNER JOIN Study_record sr
          ON sr.post_num  = ss.post_num 
          WHERE rn.userid = ?
          AND rn.read_at IS NULL
          `;
    const [rows, fields] = await pool.query(sql, [board.id]);
    return rows;
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

// 평균 시작시간 구하기
// SELECT SEC_TO_TIME(avg(TIME_TO_SEC(start_time))) as avg_time
// FROM Study_record
