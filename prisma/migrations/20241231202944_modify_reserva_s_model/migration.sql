/*
  Warnings:

  - You are about to drop the column `providersId` on the `Reservas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" INTEGER NOT NULL,
    "servicesProviderId" INTEGER NOT NULL,
    CONSTRAINT "Reservas_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_servicesProviderId_fkey" FOREIGN KEY ("servicesProviderId") REFERENCES "ServicesProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservas" ("clientsId", "create_at", "id", "servicesProviderId", "status") SELECT "clientsId", "create_at", "id", "servicesProviderId", "status" FROM "Reservas";
DROP TABLE "Reservas";
ALTER TABLE "new_Reservas" RENAME TO "Reservas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
