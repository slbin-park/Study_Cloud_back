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
const register_Sql_1 = __importDefault(require("db_sql/register.Sql"));
class RegisterClass {
    // constructor는 객체를 생성하고 초기화 해주는 메서드임
    constructor(url) {
        this.body = url; // 프론트에서 받아온 req 값을 user.body에 저장함.
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.body;
            try {
                const response = yield register_Sql_1.default.Register(client);
                return { response, success: true };
            }
            catch (err) {
                console.log(err);
                return { success: false };
            }
        });
    }
}
exports.default = RegisterClass;
