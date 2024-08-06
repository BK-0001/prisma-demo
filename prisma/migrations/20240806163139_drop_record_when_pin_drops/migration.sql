-- DropForeignKey
ALTER TABLE "board_pins" DROP CONSTRAINT "board_pins_board_id_fkey";

-- DropForeignKey
ALTER TABLE "board_pins" DROP CONSTRAINT "board_pins_pin_id_fkey";

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
