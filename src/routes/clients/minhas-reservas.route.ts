import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function allMyReservs(app: FastifyInstance) {
  app.get<{Params: {idUser: number}}>('/minhas-reservas/:idUser', async (req, res) => {
    
    const { idUser } = req.params

    const data = await prisma.reservas.findMany({
      where: {
        clientsId: Number(idUser),
      }
    })

    return res.status(200).send({reservas:data})
  })
}