import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
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

// request sent from client as an example below
// fetch("http://localhost:3000/api/v1/pins", {
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     name: "testing...",
//     image: "https://....png",
//     boardId: 1,
//     profileId: 1
//   })
// });

pinsRouter.post("/", async (req: Request, res: Response) => {
  // with help of middleware in app.ts - app.use(express.json());
  const { name, image, boardId, profileId } = req.body;

  // INSERT INTO pins (name, image) VALUES ("testing....", "https//........png");
  const createdPin = await prisma.pin.create({
    data: {
      // INSERT INTO pins (name, image) VALUES (?, 1);
      name,
      image,
      // INSERT INTO board_pins (pin_id, board_id) VALUES (?, 1);
      boardPins: {
        create: {
          boardId
        }
      }
    },
    include: {
      boardPins: {
        include: {
          board: true
        }
      }
    }
    // IT IS NOT JOIN!!!!!!
    // SELECT
    //   json_build_object(
    //     'id', p.id,
    //     'name', p.name,
    //     'image', p.image,
    //     'createdAt', p.created_at,
    //     'updatedAt', p.updated_at,
    //     'boards', json_agg(
    //       json_build_object(
    //         'id', b.id,
    //         'name', b.name,
    //         'isPublic', b.is_public,
    //         'createdAt', b.created_at,
    //         'updatedAt', b.updated_at
    //       )
    //     )
    //   ) as pin_with_boards
    // FROM
    //   pins p
    // JOIN
    //   board_pins bp ON p.id = bp.pin_id
    // JOIN
    //   boards b ON bp.board_id = b.id
    // GROUP BY p.id;
  });

  res.json({ message: "ok", data: createdPin });
});

// SELECT
//  *
// FROM pins
// JOIN board_pins
// ON board_pins.pin_id = pins.id
// JOIN boards
// ON board_pins.board_id = boards.id
// WHERE pins.id = 1;

// With JOIN
// "pinIid": 3,
// "name": "testing...",
// "image": "https://....png",
// "createdAt": "2024-08-02T19:12:42.985Z",
// "updatedAt": "2024-08-02T19:12:42.985Z",
// "profileId": null,
// "boardId": 1,
// "name": "Profile",
// "isPublic": false,
// "createdAt": "2024-08-02T18:14:35.276Z",
// "updatedAt": "2024-08-02T18:14:35.276Z",
// "profileId": 1

// PATCH /api/v1/pins/:id
pinsRouter.patch(
  "/:id",
  async (
    req: Request<{ id: string }, unknown, Prisma.PinUpdateInput>,
    res: Response
  ) => {
    const id = +req.params.id;
    const pinUpdateInput = req.body;

    const option: Prisma.PinUpdateArgs<DefaultArgs> = {
      where: { id },
      data: pinUpdateInput
    };

    const updated = await prisma.pin.update(option);

    res.json(updated);
  }
);

// DELETE /api/v1/pins/:id
pinsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = +req.params.id;

  try {
    const deleted = await prisma.pin.delete({ where: { id } });
    res.json(deleted);
  } catch (err) {
    throw new Error(`${err}`);
  }
});

// "\nInvalid `prisma.pin.delete()` invocation in\n/Users/bart/ciccc/node-m0124/w5d4/prisma-demo/src/routes/pins.router.ts:149:44\n\n  146 const id = +req.params.id;\n  147 \n  148 try {\n→ 149   const deleted = await prisma.pin.delete(\nForeign key constraint failed on the field: `board_pins_pin_id_fkey (index)`"
