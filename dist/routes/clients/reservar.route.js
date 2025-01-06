"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fazerReservaRoute = fazerReservaRoute;
const prisma_1 = require("../../lib/prisma");
const descontar_saldo_usuario_1 = require("../../utils/descontar-saldo-usuario");
async function fazerReservaRoute(app) {
    app.post('/reservar/:idUser/:idService/:idProvedor', async (req, res) => {
        const { idUser, idService, idProvedor } = req.params;
        const verifyUser = await prisma_1.prisma.clients.findUnique({
            where: {
                id: Number(idUser)
            }
        });
        verifyUser?.saldo;
        const verifyService = await prisma_1.prisma.servicesProvider.findUnique({
            where: {
                id: Number(idService),
                AND: {
                    providersId: Number(idProvedor)
                }
            }
        });
        verifyService?.preco;
        if (!verifyService || !verifyUser)
            return res.send({ message: "Usuário, Provedor ou servico não encontrado." });
        // FUNCAO PARA VERIFICAR SALDO DO USUARIO E DESCONTAR O VALOR DO SERVICO
        const result = await (0, descontar_saldo_usuario_1.descontarSaldoDoUsuarioPeloServico)({
            idDoUsuario: Number(idUser),
            precoDoServico: Number(verifyService.preco),
            saldoUsuario: Number(verifyUser.saldo)
        });
        if (!result)
            return res.send({ message: "Saldo insuficiente" });
        const data = await prisma_1.prisma.reservas.create({
            data: {
                clientsId: Number(idUser),
                servicesProviderId: Number(idService),
                providersId: Number(idProvedor)
            }
        });
        await prisma_1.prisma.historys.create({
            data: {
                reservasId: data.id
            }
        });
        return res.status(200).send({ message: "Servico reservado com sucesso!" });
    });
}
