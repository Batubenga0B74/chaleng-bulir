/*
  Warnings:

  - You are about to drop the `Stories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stories" DROP CONSTRAINT "Stories_reservasId_fkey";

-- DropTable
DROP TABLE "Stories";

-- CreateTable
CREATE TABLE "Historys" (
    "id" SERIAL NOT NULL,
    "reservasId" INTEGER NOT NULL,

    CONSTRAINT "Historys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Historys" ADD CONSTRAINT "Historys_reservasId_fkey" FOREIGN KEY ("reservasId") REFERENCES "Reservas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
