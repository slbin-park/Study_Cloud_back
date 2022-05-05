import express, { Request, Response, NextFunction } from 'express';

const app = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

app.listen('3001', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3001🛡️
  ################################################
`);
});