"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("db_/db"));
class BoardSql {
    static Save_board(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "INSERT INTO Study_share(post_num,id,share_date) VALUES(?, ?, ?);";
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.post_num, board.id, board.date], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Get_board(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                (0, db_1.default)((conn) => {
                    conn.query(query, [], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Check_board(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = '`User`';
                const query = `
            SELECT *
            FROM Study_share
            WHERE post_num = ?
            `;
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.post_num], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static get_post_from_noti(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = '`User`';
                const query = `
            SELECT *
            FROM Study_share
            WHERE board_num = (?)
            `;
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.params.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data[0]);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Set_read_noti(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = '`User`';
                const query = `
            UPDATE reply_notifi SET read_at = NOW() WHERE reply_id = (?) ;
            `;
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.params.reply_id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static get_record_from_share(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = '`User`';
                const query = `
            SELECT *
            FROM Study_record
            WHERE post_num = (?)
            `;
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.post_num], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    // 주차 평균 구하기
    static get_avg_week(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                (0, db_1.default)((conn) => {
                    conn.query(query, [q_get_date, q_get_date, q_get_date, q_get_date, q_get_date, q_get_date, q_get_date, board.params.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data[0]);
                    });
                    conn.release();
                });
            }));
        });
    }
    static get_avg_month(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.params.date, board.params.date, board.params.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data[0]);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Save_reply(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "INSERT INTO Study_share_reply(reply_board_num,id,reply,reply_date) VALUES(?, ?, ?, ?);";
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.board_num, board.id, board.reply, board.date], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Get_reply(reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = '`User`';
                const board_num = 'reply_board_num';
                const query = `
            SELECT ssr.id , ssr.reply ,ssr.reply_date , u.name 
                FROM ${user} u 
                INNER JOIN Study_share_reply ssr 
                ON u.id = ssr.id 
                WHERE ssr.${board_num}  = (?);
                `;
                (0, db_1.default)((conn) => {
                    conn.query(query, [reply.board_num], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    // 알림 저장
    static Save_noti(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "INSERT INTO reply_notifi(`userid` , replyid , created_at , read_at , reply , noti_num) VALUES(?, ?, ?, ? , ? , ?);";
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.userid, board.id, board.date, null, board.reply, board.board_num], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    // 알림 저장
    static Get_noti(board) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                (0, db_1.default)((conn) => {
                    conn.query(query, [board.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
}
exports.default = BoardSql;
