-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "saldo" TEXT NOT NULL DEFAULT '20000',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesProvider" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "providersId" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServicesProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" INTEGER NOT NULL,
    "servicesProviderId" INTEGER NOT NULL,
    "providersId" INTEGER NOT NULL,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stories" (
    "id" SERIAL NOT NULL,
    "reservasId" INTEGER NOT NULL,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServicesProvider" ADD CONSTRAINT "ServicesProvider_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_servicesProviderId_fkey" FOREIGN KEY ("servicesProviderId") REFERENCES "ServicesProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stories" ADD CONSTRAINT "Stories_reservasId_fkey" FOREIGN KEY ("reservasId") REFERENCES "Reservas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
