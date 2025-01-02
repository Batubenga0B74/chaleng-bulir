/*
  Warnings:

  - You are about to alter the column `status` on the `Reservas` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" INTEGER NOT NULL,
    "providersId" INTEGER NOT NULL,
    "servicesProviderId" INTEGER NOT NULL,
    CONSTRAINT "Reservas_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_servicesProviderId_fkey" FOREIGN KEY ("servicesProviderId") REFERENCES "ServicesProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservas" ("clientsId", "create_at", "id", "providersId", "servicesProviderId", "status") SELECT "clientsId", "create_at", "id", "providersId", "servicesProviderId", coalesce("status", false) AS "status" FROM "Reservas";
DROP TABLE "Reservas";
ALTER TABLE "new_Reservas" RENAME TO "Reservas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
