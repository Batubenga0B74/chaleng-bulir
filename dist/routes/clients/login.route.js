"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginClientAuth = loginClientAuth;
const prisma_1 = require("../../lib/prisma");
async function loginClientAuth(app) {
    app.get("/login/:email/:senha", async (req, res) => {
        const { email, senha } = req.params;
        if (!email || !senha)
            return res.status(404).send({ message: "Email e/ou Senha invalidas" });
        const data = await prisma_1.prisma.clients.findUnique({
            where: {
                email,
                AND: {
                    senha: {
                        equals: senha
                    }
                }
            }
        });
        if (!data)
            return res.send({ message: "Usuario nao encontrado" });
        return res.send(data);
    });
}
