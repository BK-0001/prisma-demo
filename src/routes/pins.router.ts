import { Request, Response, Router } from "express";

import { prisma } from "../../prisma/client";

export const pinsRouter = Router();

// /api/v1/pins
pinsRouter.get("/", async (req: Request, res: Response) => {
  // stay with pin model if possible since we are in pins router
  // SELECT * FROM pins;
  const pins = await prisma.pin.findMany();
  res.json({ message: "ok", data: pins });
});

pinsRouter.post("/", async (req: Request, res: Response) => {
  // stay with pin model if possible since we are in pins router
  // SELECT * FROM pins;
  const pins = await prisma.pin.findMany();
  res.json({ message: "ok", data: pins });
});
