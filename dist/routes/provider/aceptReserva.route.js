"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aceptReservaRoute = aceptReservaRoute;
const prisma_1 = require("../../lib/prisma");
async function aceptReservaRoute(app) {
    app.get('/aceitar/:idReserva', async (req, res) => {
        const { idReserva } = req.params;
        if (!idReserva)
            return res.send({ message: "Reserva não encontrada" });
        await prisma_1.prisma.reservas.update({
            where: {
                id: Number(idReserva)
            },
            data: {
                status: true
            }
        });
        return res.send({ message: "Reserva aceite" });
    });
}
