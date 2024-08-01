import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const run = async () => {
  const account = await prisma.account.create({
    data: {
      email: "bart5@gmail.com",
      profile: {
        create: {
          boards: {
            createMany: {
              data: [{ name: "board1" }, { name: "board2" }]
            }
          }
        }
      }
    },
    include: {
      profile: {
        include: {
          boards: true
        }
      }
    }
  });

  console.log(JSON.stringify(account));
  console.log("generated");
};

run();
