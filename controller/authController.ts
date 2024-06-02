import express, { Request, Response, NextFunction } from "express";
import authService from "../services/authServices";
import { UsersModel } from "../models/users";

const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    authService
      .authenticate(email, password)
      .then((data) => {
        res.status(200).json({
          status: "OK",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async register(req: Request, res: Response) {
    const { email, password, name, role } = req.body;

    if (role == "SUPERADMIN") {
      return res.status(403).json({
        status: "FAIL",
        message: "Forbidden",
      });
    }

    if (role == "ADMIN") {
      const token = req.headers.authorization!.split(" ")[1];
      const result = await authService.whoami(token);
      if (result.user.role !== "SUPERADMIN") {
        return res.status(403).json({
          status: "FAIL",
          message: "Forbidden",
        });
      }
    }
    authService
      .register(email, name, password, role)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async whoami(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "FAIL",
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "FAIL",
        message: "Token is missing",
      });
    }

    authService
      .whoami(token)
      .then((user) => {
        res.status(200).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};

export default authController;
