import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function fazerReservaRoute(app: FastifyInstance) {
  app.post<{Params: {idUser: number, idService: number, idProvedor: number}}>('/reservar/:idUser/:idService/:idProvedor', async (req, res) => {
    const { idUser, idService, idProvedor } = req.params

    const verifyUser = await prisma.clients.findUnique({
      where: {
        id: Number(idUser)
      }
    })

    const verifyService = await prisma.servicesProvider.findUnique({
      where: {
        id: Number(idService),
        AND: {
          providersId: Number(idProvedor)
        }
      }
    })

    if(!verifyService || !verifyUser) return res.status(404).send("Usuário, Provedor ou servico não encontrado.")

    
    const data = await prisma.reservas.create({
      data:{
        clientsId: Number(idUser),
        servicesProviderId: Number(idService),
        providersId: Number(idProvedor)
      }
    })

    await prisma.stories.create({
      data:{
        reservasId: data.id
      }
    })

    return res.status(200).send("Reserva criada")
  })
}