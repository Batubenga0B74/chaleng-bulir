-- CreateTable
CREATE TABLE "clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "saldo" TEXT NOT NULL DEFAULT '20000',
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "providers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ServicesProvider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "providersId" INTEGER NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServicesProvider_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT DEFAULT 'false',
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" INTEGER NOT NULL,
    "providersId" INTEGER NOT NULL,
    "servicesProviderId" INTEGER NOT NULL,
    CONSTRAINT "Reservas_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservas_servicesProviderId_fkey" FOREIGN KEY ("servicesProviderId") REFERENCES "ServicesProvider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservasId" INTEGER NOT NULL,
    CONSTRAINT "Stories_reservasId_fkey" FOREIGN KEY ("reservasId") REFERENCES "Reservas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
