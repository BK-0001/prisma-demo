import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors/custom-error";
import { apiRouter } from "./routes";

export const app = express();

app.use(express.json());

app.use("/api/v1", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `Not Found Route - ${req.method} ${req.path}` });
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error);
    }
  }
);
