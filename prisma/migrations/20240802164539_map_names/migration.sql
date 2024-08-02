/*
  Warnings:

  - You are about to drop the `BoardPin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoardPin" DROP CONSTRAINT "BoardPin_boardId_fkey";

-- DropForeignKey
ALTER TABLE "BoardPin" DROP CONSTRAINT "BoardPin_pinId_fkey";

-- DropTable
DROP TABLE "BoardPin";

-- CreateTable
CREATE TABLE "board_pins" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "board_id" INTEGER NOT NULL,
    "pin_id" INTEGER NOT NULL,

    CONSTRAINT "board_pins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
