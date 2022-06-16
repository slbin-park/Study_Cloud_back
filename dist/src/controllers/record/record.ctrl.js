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
const record_class_1 = __importDefault(require("./record.class"));
const Record_request = {
    PostRecord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_record = new record_class_1.default(req.body);
        const res_register = yield req_record.save();
        return res.json(res_register);
    }),
    GetRecord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_record = new record_class_1.default(req.body);
        const res_register = yield req_record.get();
        return res.json(res_register);
    }),
    UpdateRecord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_record = new record_class_1.default(req.body);
        const res_register = yield req_record.update();
        return res.json(res_register);
    }),
    DeleteRecord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const req_record = new record_class_1.default(req.body);
        const res_register = yield req_record.delete();
        return res.json(res_register);
    }),
};
exports.default = Record_request;
