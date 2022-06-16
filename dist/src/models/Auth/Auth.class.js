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
require("config/env");
const Auth_Sql_1 = __importDefault(require("./Auth.Sql"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
class Auth {
    constructor(body, token = '') {
        this.body = body;
        this.token = token;
    }
    create_Refresh_Token() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = this.body;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(jwt.sign({
                    'id': info.id,
                    'name': info.name,
                    'major': info.major,
                    'school': info.school
                }, process.env.JWT_REFRESH_SECRET, {
                    expiresIn: "180days", // 토큰 유효시간 10분임
                }));
            }));
        });
    }
    // Access Token 생성
    create_Access_Token() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = this.body;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(jwt.sign({
                    'id': info.id,
                    'name': info.name,
                    'major': info.major,
                    'school': info.school
                }, process.env.JWT_ACCESS_SECRET, {
                    //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
                    expiresIn: "10m", // 토큰 유효시간 10분임
                }));
            }));
        });
    }
    checkToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = this.body;
                const token = info.headers.authorization;
                const secret_key = info.body.check ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
                // check 가 true면 Access , false면 Refresh
                // const payload = jwt.decode(token, secret_key);
                return {
                    token: jwt.verify(token, secret_key), success: true
                };
            }
            catch (error) {
                console.log(error.name);
                // 유효기간이 초과된 경우
                if (error.name === 'TokenExpiredError') {
                    return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
                }
                // 토큰의 비밀키가 일치하지 않는 경우
                return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
            }
        });
    }
    check_refresh_Token() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = this.body;
                const token = yield Auth_Sql_1.default.SELECT_Refresh_Token(info);
                // check 가 true면 Access , false면 Refresh
                // const payload = jwt.decode(token, secret_key);
                return {
                    token
                };
            }
            catch (error) {
                console.log(error.name);
                // 유효기간이 초과된 경우
                if (error.name === 'TokenExpiredError') {
                    return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
                }
                // 토큰의 비밀키가 일치하지 않는 경우
                return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const hash = yield Auth_Sql_1.default.Login(client);
                if (hash) {
                    const check = yield bcrypt.compare(client.password, hash.password);
                    return { success: check, hash };
                }
                return {
                    success: false
                };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    update_refresh_Token() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.body;
                const token = this.token;
                const res_token = yield Auth_Sql_1.default.UPDATE_Refresh_Token(id, token);
                // check 가 true면 Access , false면 Refresh
                // const payload = jwt.decode(token, secret_key);
                return {
                    res_token,
                    success: true
                };
            }
            catch (error) {
                console.log(error.name);
                return {
                    success: false
                };
            }
        });
    }
}
exports.default = Auth;
