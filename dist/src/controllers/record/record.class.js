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
const record_Sql_1 = __importDefault(require("db_sql/record.Sql"));
class Recordclass {
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    //데이터 저장
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield record_Sql_1.default.Save(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    // 데이터만 내보내줌
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield record_Sql_1.default.Get(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    // 데이터 수정
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield record_Sql_1.default.Update(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
    // 데이터 삭제
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield record_Sql_1.default.Delete(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
}
exports.default = Recordclass;
