import express, { Request, Response, NextFunction } from 'express';
import path from "path";
import db from './database/db';
import routing from './routes/router';

const {swaggerUi,specs} = require('./config/swagger');


// 

const app = express(),
      cors= require('cors');

app.use(cors());
app.use(express.json());
// Express 4.16 이전 버젼인 경우는
// body-parser를 사용했지만
// 이후 버전은 express.json으로 사용이 가능하다.

app.use('/api',routing)

// 스웨거
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
// 스웨거
const PORT = process.env.PORT || 8080;
app.listen(PORT|| 8080, () => {
    console.log(`
  ################################################
  🛡️  Server listening on ${PORT}: 3001🛡️
  ################################################
`);
});