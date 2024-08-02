/*
  Warnings:

  - You are about to drop the `_BoardToPin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardToPin" DROP CONSTRAINT "_BoardToPin_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToPin" DROP CONSTRAINT "_BoardToPin_B_fkey";

-- DropTable
DROP TABLE "_BoardToPin";

-- CreateTable
CREATE TABLE "BoardPin" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardId" INTEGER NOT NULL,
    "pinId" INTEGER NOT NULL,

    CONSTRAINT "BoardPin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "pins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
