"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarTodasReservas = listarTodasReservas;
const prisma_1 = require("../../lib/prisma");
async function listarTodasReservas(app) {
    app.get("/listar-todas", async (req, res) => {
        const allReservs = await prisma_1.prisma.reservas.findMany();
        return res.send(allReservs);
    });
}
