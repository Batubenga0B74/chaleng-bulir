"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginProviderAuth = loginProviderAuth;
const prisma_1 = require("../../lib/prisma");
async function loginProviderAuth(app) {
    app.get("/login/:email/:senha", async (req, res) => {
        const { email, senha } = req.params;
        if (!email || !senha)
            return res.status(404).send({ message: "Email e/ou Senha invalidas" });
        const data = await prisma_1.prisma.providers.findUnique({
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
            return res.status(404).send({ message: "Usuario nao encontrado" });
        return res.send(data);
    });
}
