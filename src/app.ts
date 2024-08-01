import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors/custom-error";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: `Not Found Route - ${req.method} ${req.path}` });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error);
  }
});
