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
const bcrypt = require('bcrypt');
const saltRounds = 10;
class RegisterSql {
    static Save(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "INSERT INTO Study_record(id, date, start_time,end_time,title,memo) VALUES(?, ?, ?, ?, ?,?);";
                (0, db_1.default)((conn) => {
                    conn.query(query, [record.id, record.date, record.start_time, record.end_time, record.title, record.content], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Get(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM Study_record WHERE id = ? ;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [info.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Update(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "UPDATE Study_record SET start_time = ? , end_time = ? , title = ? , memo = ? WHERE post_num = ? ;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [info.start_time, info.end_time, info.title, info.memo, info.post_num], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Delete(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "DELETE FROM Study_record WHERE post_num = ?;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [info.post_num], (err, data) => {
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
exports.default = RegisterSql;
