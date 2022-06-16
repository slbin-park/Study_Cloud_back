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
const Board_Sql_1 = __importDefault(require("db_sql/Board.Sql"));
class Boardclass {
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    //공유 데이터 저장
    save_board() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const check = yield Board_Sql_1.default.Check_board(client);
                if (check.length != 0) {
                    return { success: false, msg: '이미 공유된 데이터입니다.' };
                }
                const response = yield Board_Sql_1.default.Save_board(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    //공유 데이터 불러오기
    get_board() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.Get_board(client);
                return { board: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    //공유 데이터 불러오기
    get_one_board() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.get_post_from_noti(client);
                return { board: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    set_read_noti() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.Set_read_noti(client);
                return { board: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    // 해당 게시글 정보 불러오기
    get_one_share() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.get_record_from_share(client);
                return { board: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    // 해당 게시글 정보 불러오기
    get_avg() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const week = yield Board_Sql_1.default.get_avg_week(client);
                const month = yield Board_Sql_1.default.get_avg_month(client);
                if (week.sum === null) {
                    week.st = 0;
                    week.et = 0;
                    week.avg = 0;
                    week.sum = 0;
                }
                if (month.sum === null) {
                    month.st = 0;
                    month.et = 0;
                    month.avg = 0;
                    month.sum = 0;
                }
                return { week, month, success: true };
                // return {week,success:true};
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    //댓글 데이터 저장
    save_reply() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.Save_reply(client);
                const response_noti = yield Board_Sql_1.default.Save_noti(client);
                return { reply: response, noti: response_noti, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    //댓글 데이터 저장
    get_reply() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.Get_reply(client);
                return { reply: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    //댓글 데이터 저장
    get_noti() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield Board_Sql_1.default.Get_noti(client);
                return { reply: response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
}
exports.default = Boardclass;
