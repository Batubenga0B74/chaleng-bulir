"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descontarSaldoDoUsuarioPeloServico = descontarSaldoDoUsuarioPeloServico;
const prisma_1 = require("./../lib/prisma");
async function descontarSaldoDoUsuarioPeloServico({ idDoUsuario, saldoUsuario, precoDoServico }) {
    if (Number(saldoUsuario) >= Number(precoDoServico)) {
        const novoSaldoDoUsuario = Number(saldoUsuario) - Number(precoDoServico);
        await prisma_1.prisma.clients.update({
            data: {
                saldo: String(novoSaldoDoUsuario)
            },
            where: {
                id: idDoUsuario
            }
        });
        return true;
    }
    else {
        return false;
    }
}
