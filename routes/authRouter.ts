import express, { Request, Response, NextFunction } from "express";
import authController from "../controller/authController";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/whoami", authController.whoami);

export default router;
