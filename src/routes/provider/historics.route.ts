import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function showMyHistoricsReservs(app: FastifyInstance) {
  app.get<{Params: {idProvedor: number}}>("/historicos/:idProvedor", async (req, res) => {

    const { idProvedor } = req.params

    const list = await prisma.reservas.findMany({
      where: {
        providersId: {
          equals: Number(idProvedor)
        }
      }
    })

    return res.status(200).send(list)
  })
}