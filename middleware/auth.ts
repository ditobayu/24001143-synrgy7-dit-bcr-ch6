import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: "OK", message: "Authorization header is missing" });
  }
  const token = req.headers.authorization!.split(" ")[1];
  if (!token)
    return res.status(401).jsonp({
      status: "FAIL",
      message: "Token is missing",
    });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret") as { id: number };
    console.log(decoded);
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      status: "FAIL",
      message: "Invalid token",
    });
  }
};

const authorizeRoles = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(" ")[1];
    const userDecoded = jwt.verify(token, "your_jwt_secret") as { id: number };
    // const userDecoded = req.userDecoded;
    if (!userDecoded) {
      return res.status(401).json({ message: "Unauthorized", status: "FAIL" });
    }

    const user = await userRepository.find(userDecoded.id.toString());

    const userRole = user!.role;
    if (
      allowedRoles.includes(userRole) ||
      (userRole === "SUPERADMIN" && allowedRoles.includes("ADMIN"))
    ) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden", status: "FAIL" });
    }
  };
};

export { authenticateJWT, authorizeRoles };
