"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../config/env");
const mysql = require('mysql'); // mysql 모듈 로드
const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
function getConnection(callback) {
    pool.getConnection((err, conn) => {
        if (!err) {
            callback(conn);
        }
    });
}
exports.default = getConnection;
