import { Request, Response } from "express";
import carService from "../services/carServices";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import getUserIdFromToken from "../helper/getUserId";

const carController = {
  list(req: Request, res: Response) {
    carService
      .list()
      .then(({ data, count }) => {
        console.log("test");
        res.status(200).json({
          status: "OK",
          data: { posts: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req: Request, res: Response) {
    const requiredFields = [
      "name",
      "category",
      "price",
      "color",
      "year",
      "image",
      "created_by",
      "updated_by",
    ];

    // Check for missing fields
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === "") {
        res.status(400).json({
          status: "FAIL",
          message: `${field} is required`,
        });
        return;
      }
    }
    if (
      !(
        req.body.category == "SMALL" ||
        req.body.category == "MEDIUM" ||
        req.body.category == "LARGE"
      )
    ) {
      res.status(400).json({
        status: "FAIL",
        message: "Category must be SMALL, MEDIUM, or LARGE",
      });
      return;
    }
    carService
      .create(req.body)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req: Request, res: Response) {
    const token = req.headers.authorization!.split(" ")[1];

    const userId = getUserIdFromToken(token);
    carService
      .update(req.params.id, req.body, userId)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: "Car updated successfully",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req: Request, res: Response) {
    carService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroy(req: Request, res: Response) {
    const token = req.headers.authorization!.split(" ")[1];

    const userId = getUserIdFromToken(token);
    carService
      .delete(req.params.id, req.body, userId)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: "Car deleted successfully",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};

export default carController;
