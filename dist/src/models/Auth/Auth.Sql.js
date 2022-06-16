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
class AuthSql {
    static SELECT_Refresh_Token(tokeninfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT refresh_token FROM User WHERE id = ? ;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [tokeninfo.id,], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data[0].refresh_token);
                    });
                    conn.release();
                });
            }));
        });
    }
    static UPDATE_Refresh_Token(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "UPDATE User SET refresh_token = (?) WHERE id = (?) ;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [token, id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data);
                    });
                    conn.release();
                });
            }));
        });
    }
    static Login(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM User WHERE id = ?;";
                (0, db_1.default)((conn) => {
                    conn.query(query, [userInfo.id], (err, data) => {
                        if (err)
                            reject(`${err}`);
                        resolve(data[0]);
                        // 하나만 선택할 경우 0 번째로 선택해서 넘겨줘야함
                    });
                    conn.release();
                });
            }));
        });
    }
}
exports.default = AuthSql;
