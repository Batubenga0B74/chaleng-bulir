import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import { Equals } from "class-validator"

// APRESENTAR RESERVAS DE UM FORNECEDOR
export async function listarReservasDoProvedorRoute(app: FastifyInstance) {
  app.get<{Params: {idProvedor: number}}>('/list/:idProvedor', async (req, res) => {
    const list = await prisma.reservas.findMany({
      where: {
        providersId: {
          equals: Number(req.params.idProvedor)
        }
      }
    })
    return res.status(200).send(list)
  })
}