/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nif]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nif]` on the table `providers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_nif_key" ON "clients"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "providers_email_key" ON "providers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "providers_nif_key" ON "providers"("nif");
