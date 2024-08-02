import { Router } from "express";
import { pinsRouter } from "./pins.router";

export const apiRouter = Router();

// /api/v1/pins
apiRouter.use("/pins", pinsRouter);
