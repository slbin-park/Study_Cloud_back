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
const register_class_1 = __importDefault(require("./register.class"));
const Register_request = {
    PostRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // bcrypt hash() 함수로 비밀번호를 암호화함
        const req_register = new register_class_1.default(req.body);
        const res_register = yield req_register.register();
        return res.json(res_register);
        // return res.json('asdf')
    }),
    PostLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_login = new register_class_1.default(req.body);
    })
};
exports.default = Register_request;
