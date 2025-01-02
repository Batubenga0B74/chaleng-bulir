/*
  Warnings:

  - Added the required column `providersId` to the `Reservas` table without a default value. This is not possible if the table is not empty.

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
    "providersId" INTEGER NOT NULL,
    CONSTRAINT "Reservas_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_servicesProviderId_fkey" FOREIGN KEY ("servicesProviderId") REFERENCES "ServicesProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservas" ("clientsId", "create_at", "id", "servicesProviderId", "status") SELECT "clientsId", "create_at", "id", "servicesProviderId", "status" FROM "Reservas";
DROP TABLE "Reservas";
ALTER TABLE "new_Reservas" RENAME TO "Reservas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
