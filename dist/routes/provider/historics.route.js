"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMyHistoricsReservs = showMyHistoricsReservs;
const prisma_1 = require("../../lib/prisma");
async function showMyHistoricsReservs(app) {
    app.get("/historicos/:idProvedor", async (req, res) => {
        const { idProvedor } = req.params;
        const list = await prisma_1.prisma.reservas.findMany({
            where: {
                providersId: {
                    equals: Number(idProvedor)
                }
            }
        });
        return res.status(200).send(list);
    });
}
