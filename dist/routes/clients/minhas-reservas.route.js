"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMyReservs = allMyReservs;
const prisma_1 = require("../../lib/prisma");
async function allMyReservs(app) {
    app.get('/minhas-reservas/:idUser', async (req, res) => {
        const { idUser } = req.params;
        const data = await prisma_1.prisma.reservas.findMany({
            where: {
                clientsId: Number(idUser),
            }
        });
        return res.status(200).send({ reservas: data });
    });
}
