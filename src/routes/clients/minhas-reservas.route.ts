import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function allMyReservs(app: FastifyInstance) {
  app.get<{Params: {idUser: number, idService: number}}>('/minhas-reservas/:idUser/:idService', async (req, res) => {
    
    const { idUser, idService } = req.params

    const data = await prisma.reservas.findMany({
      where: {
        clientsId: Number(idUser),
        AND:{
          servicesProviderId: Number(idService)
        }
      }
    })

    return res.status(200).send({reservas:data})
  })
}