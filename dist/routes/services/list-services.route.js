"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllServicesRoute = listAllServicesRoute;
const prisma_1 = require("./../../lib/prisma");
// LISTAR TODOS OS SERVICOS CADASTRADOS
async function listAllServicesRoute(app) {
    app.get('/listar', async (req, res) => {
        const list = await prisma_1.prisma.servicesProvider.findMany();
        return list;
    });
}
