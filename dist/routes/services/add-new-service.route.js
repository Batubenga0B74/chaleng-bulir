"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceRoute = createServiceRoute;
const prisma_1 = require("../../lib/prisma");
// Rota de criação de servico
async function createServiceRoute(app) {
    app.post('/new-service', async (req, res) => {
        const { nome, descricao, preco, providerID } = req.body;
        const provider = await prisma_1.prisma.providers.findUnique({
            where: {
                id: providerID
            }
        });
        if (provider === null)
            return res.status(400).send({ message: "Provider not found" });
        if (!nome)
            return res.status(400).send({ message: "Informe o nome do servico" });
        if (!descricao)
            return res.status(400).send({ message: "Informe Descrição do servico" });
        if (!preco)
            return res.status(400).send({ message: "Informe Preço do servico" });
        await prisma_1.prisma.servicesProvider.create({
            data: {
                nome,
                descricao,
                preco,
                providersId: providerID
            }
        });
        return res.status(201).send({ message: "Serviço criado" });
    });
}
