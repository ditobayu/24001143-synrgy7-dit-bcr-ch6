import { JwtPayload } from "jsonwebtoken";
import { UsersModel } from "../models/users";

declare module "express-serve-static-core" {
  interface Request {
    user?: UsersModel; // Sesuaikan tipe user sesuai dengan yang Anda gunakan
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Sesuaikan tipe user sesuai dengan yang Anda gunakan
    }
  }
}
