import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const run = async () => {
  const account = await prisma.account.create({
    data: { email: "bart@gmail.com" }
  });

  console.log(account);

  const profile = await prisma.profile.create({
    data: { firstName: "bart", accountId: account.id }
  });

  console.log(profile);

  const boards = await prisma.board.createManyAndReturn({
    data: [
      { name: "Profile", profileId: profile.id },
      { name: "my secret board", isPublic: false, profileId: profile.id }
    ]
  });

  console.log(boards);

  // INSERT INTO pints ( name, image, profile_id) VALUES (...);
  const pin = await prisma.pin.create({
    data: {
      name: "My First Pin",
      image: "image.png",
      profileId: profile.id
    }
  });

  console.log("----------------------------------------", pin);

  // INSERT INTO board_pins (board_id, pin_id) VALUES (1, 1);
  const boardPin = await prisma.boardPin.create({
    data: {
      boardId: boards[0].id, // 1
      pinId: pin.id // 1
    }
  });

  console.log("---------board pin-----------\n", boardPin);

  // SELECT * FROM boards
  // JOIN board_pins
  // ON boards.id = board_pins.board_id
  // JOIN pins
  // ON pins.id = board_pins.pin_id
  // WHERE boards.id = 1

  // confirming if the data is correctly inserted
  const boardIncludesPins = await prisma.board.findFirst({
    include: {
      boardPins: {
        include: {
          pin: true
        }
      }
    },
    where: { id: 1 }
  });

  console.log("----------board including pins-------------", boardIncludesPins);
};

run();
