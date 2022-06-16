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
    static Register(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const hashing = yield bcrypt.hash(userInfo.password, saltRounds);
                const query = "INSERT INTO User(id, password, name,school,major) VALUES(?, ?, ?, ?, ?);";
                (0, db_1.default)((conn) => {
                    conn.query(query, [userInfo.id, hashing, userInfo.name, userInfo.school, userInfo.major], (err, data) => {
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
