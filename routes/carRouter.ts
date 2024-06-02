import express, { Request, Response, NextFunction } from "express";
import carController from "../controller/carController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";
import upload from "../middleware/uploadHandler";

const router = express.Router();

router.use(authenticateJWT);

router.get("/", carController.list);
router.get("/:id", authenticateJWT, carController.show);
router.post(
  "/",
  upload.single("image"),
  authorizeRoles("ADMIN", "SUPERADMIN"),
  carController.create
);
router.put(
  "/:id",
  upload.single("image"),
  authorizeRoles("ADMIN", "SUPERADMIN"),
  carController.update
);
router.delete(
  "/:id",
  authorizeRoles("ADMIN", "SUPERADMIN"),
  carController.destroy
);

export default router;
