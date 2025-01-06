import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function listarTodasReservas(app: FastifyInstance) {
  app.get("/listar-todas", async (req, res)=>{
    const allReservs = await prisma.reservas.findMany()
    return res.send(allReservs)
  })
}