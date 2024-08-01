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
      { name: "Board 1", profileId: profile.id },
      { name: "my secret board", isPublic: false, profileId: profile.id }
    ]
  });

  console.log(boards);
};

run();
