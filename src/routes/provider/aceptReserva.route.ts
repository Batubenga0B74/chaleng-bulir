import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function aceptReservaRoute(app: FastifyInstance) {
  app.get<{Params: {idReserva: number}}>('/aceitar/:idReserva', async (req, res) => {

    const { idReserva } = req.params

    if(!idReserva) return res.send({message:"Reserva não encontrada"})
    
    await prisma.reservas.update({
      where: {
        id: Number(idReserva)
      },
      data: {
        status: true
      }
    })
    return res.send({message:"Reserva aceite"})
  })
}