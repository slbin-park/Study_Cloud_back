"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router_1 = require("./src/routes/router");
var _a = require('./src/config/swagger'), swaggerUi = _a.swaggerUi, specs = _a.specs;
// 
var app = (0, express_1["default"])(), cors = require('cors');
app.use(cors());
app.use(express_1["default"].json());
// Express 4.16 이전 버젼인 경우는
// body-parser를 사용했지만
// 이후 버전은 express.json으로 사용이 가능하다.
app.use('/api', router_1["default"]);
// 스웨거
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
// 스웨거
app.listen('3001', function () {
    console.log("\n  ################################################\n  \uD83D\uDEE1\uFE0F  Server listening on port: 3001\uD83D\uDEE1\uFE0F\n  ################################################\n");
});
