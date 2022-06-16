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
const Auth_class_1 = __importDefault(require("./Auth.class"));
const Auth_Request = {
    Create_Token: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Auth = new Auth_class_1.default(req.body);
        const res_Auth = yield req_Auth.create_Refresh_Token();
        return res.json(res_Auth);
    }),
    Check_Token: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // 필요한 정보
        // token : token정보
        // check : true 면 Access false면 Refresh
        const req_Auth = new Auth_class_1.default(req.body);
        // console.log(req)
        // console.log(req.headers)
        const res_Auth = yield req_Auth.checkToken();
        // 이건 treu false만 반환함 
        return res_Auth.success;
    }),
    Check_Refresh_Token: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // 필요한 정보
        // token : token정보
        // check : true 면 Access false면 Refresh
        const req_Auth = new Auth_class_1.default(req);
        // console.log(req)
        const res_Auth = yield req_Auth.checkToken();
        // 토큰이 유효하면
        if (res_Auth.success) {
            const req_tokn = new Auth_class_1.default(res_Auth.token);
            const res_token = yield req_tokn.check_refresh_Token();
            if (req.headers.authorization === res_token.token) {
                const req_Access_token = new Auth_class_1.default(res_Auth.token);
                const res_Access_token = yield req_Access_token.create_Access_Token();
                return res.json({
                    access_token: res_Access_token,
                    id: res_Auth.token.id,
                    name: res_Auth.token.name,
                    school: res_Auth.token.school,
                    major: res_Auth.token.major,
                });
            }
            // 같을경우 Access를 리턴해준다.
            // 같을 경우 res_token 안에 있는 데이터로 Access를 만들어서 준다.
            return res.json({
                success: false,
                msg: '유효하지 않은 토큰입니다.'
            });
        }
        // 이건 treu false만 반환함 
        return res.json(res_Auth.success);
    }),
    Login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_Auth = new Auth_class_1.default(req.body);
        const res_Auth = yield req_Auth.login();
        // res_Auth.success  결과
        if (!res_Auth.success) {
            return res.json({
                success: false,
            });
        }
        //토큰 생성
        const req_Refresh_token = new Auth_class_1.default(res_Auth.hash);
        const res_Refresh_token = yield req_Refresh_token.create_Refresh_Token();
        // Refresh token 생성
        const res_Access_token = yield req_Refresh_token.create_Access_Token();
        // Access token 생성
        // 쿼리에 Refresh token 업데이트
        const req_Update_token = new Auth_class_1.default(res_Auth.hash.id, res_Refresh_token);
        const res_Update_token = yield req_Update_token.update_refresh_Token();
        return res.json({
            refresh_token: res_Refresh_token,
            access_token: res_Access_token,
            success: res_Update_token.success,
            id: res_Auth.hash.id,
            name: res_Auth.hash.name,
            school: res_Auth.hash.school,
            major: res_Auth.hash.major,
        });
    })
};
exports.default = Auth_Request;
