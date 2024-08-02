import { Request, Response, Router } from "express";
import { prisma } from "../../prisma/client";
import { CustomError } from "../errors/custom-error";

export const pinsRouter = Router();

// GET /api/v1/pins
pinsRouter.get("/", async (req: Request, res: Response) => {
  // stay with pin model if possible since we are in pins router
  // SELECT * FROM pins;
  const pins = await prisma.pin.findMany();
  res.json({ message: "ok", data: pins });
});

// GET /api/v1/pins/:id
pinsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // stay with pin model if possible since we are in pins router
  // SELECT * FROM pins
  // WHERE id = :id;

  const pin = await prisma.pin.findUnique({
    where: { id: +id }
  });

  if (!pin) {
    throw new CustomError(`pin with id ${id} does not exists`, 404);
  }

  res.json({ message: "ok", data: pin });
});

// POST /api/v1/pins
