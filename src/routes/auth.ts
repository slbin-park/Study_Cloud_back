import express, { Request, Response, NextFunction } from "express";
import auth from "../middlewares/Auth/Auth.ctrl";

const router = express.Router();

router.post("/create-refresh", auth.Create_Token);
// Refresh 토큰 생성

router.post("/compare-refresh", auth.Check_Token);
// Refresh 토큰 비교

router.post("/login", auth.Login);
// Login

router.post("/check-refresh", auth.Check_Refresh_Token);
// refresh 토큰 체크

export default router;
