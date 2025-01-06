"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservaRoute = createReservaRoute;
const prisma_1 = require("../../lib/prisma");
async function createReservaRoute(app) {
    app.post('/create', async (req, res) => {
        const { clientsId, servicesProviderId, providersId } = req.body;
        await prisma_1.prisma.reservas.create({
            data: {
                clientsId,
                servicesProviderId,
                providersId
            }
        });
        return res.status(201).send("Reserva criada");
    });
}
