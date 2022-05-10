import express, { Request, Response, NextFunction } from 'express';
import path from "path";
import db from 'db_/db';
import routing from './src/routes/router';

const app = express(),
      cors= require('cors');

app.use(cors());
app.use(express.json());
// Express 4.16 이전 버젼인 경우는
// body-parser를 사용했지만
// 이후 버전은 express.json으로 사용이 가능하다.

app.use('/',routing)

app.listen('3001', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3001🛡️
  ################################################
`);
});