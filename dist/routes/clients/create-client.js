"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientRoute = createClientRoute;
const prisma_1 = require("./../../lib/prisma");
async function createClientRoute(app) {
    app.post('/create', async (req, res) => {
        const { email, nif, nome, senha } = req.body;
        if (!nif)
            return res.status(400).send({ message: "Nif is required" });
        if (!nome)
            return res.status(400).send({ message: "Name is required" });
        if (!email)
            return res.status(400).send({ message: "Email is required" });
        if (!senha)
            return res.status(400).send({ message: "Password is required" });
        const verify = await prisma_1.prisma.clients.findMany({
            where: {
                email: {
                    equals: email,
                },
                OR: [{ nif: { equals: nif } }]
            }
        });
        if (verify.length > 0)
            return res.status(201).send({ message: "EMAIL e/ou NIF já existem" });
        const data = await prisma_1.prisma.clients.create({
            data: {
                email,
                nif,
                nome,
                senha
            }
        });
        return res.status(201).send({ message: "Client created", data });
    });
}
