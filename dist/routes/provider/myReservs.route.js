"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarReservasDoProvedorRoute = listarReservasDoProvedorRoute;
const prisma_1 = require("../../lib/prisma");
// APRESENTAR RESERVAS DE UM FORNECEDOR
async function listarReservasDoProvedorRoute(app) {
    app.get('/list/:idProvedor', async (req, res) => {
        const list = await prisma_1.prisma.reservas.findMany({
            where: {
                providersId: {
                    equals: Number(req.params.idProvedor),
                },
            },
            include: {
                client: {
                    select: {
                        nome: true,
                    },
                },
                serviceProvider: {
                    select: {
                        nome: true,
                    },
                },
            },
        });
        return res.status(200).send(list);
    });
}
