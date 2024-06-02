import express, { Express, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import Router from "../routes/index";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swaggerConfig.json";

const app: Express = express();
const port = 3000;

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "ditobayu25",
    port: 5432,
    host: "localhost",
    database: "CHALLENGE6",
  },
});

Model.knex(knexInstance);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use("/public", express.static(path.join(__dirname, "./public")));

app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));
app.use(Router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
