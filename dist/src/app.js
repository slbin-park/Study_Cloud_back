"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const { swaggerUi, specs } = require('./config/swagger');
// 
const app = (0, express_1.default)(), cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
// Express 4.16 이전 버젼인 경우는
// body-parser를 사용했지만
// 이후 버전은 express.json으로 사용이 가능하다.
app.use('/api', router_1.default);
// 스웨거
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
// 스웨거
app.listen(process.env.PORT || '3001', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3001🛡️
  ################################################
`);
});
