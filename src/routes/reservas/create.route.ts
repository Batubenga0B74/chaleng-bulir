import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import { CreateReserva } from "./reservas.interface";

export async function createReservaRoute(app: FastifyInstance) {
  app.post<{Body: CreateReserva}>('/create', async (req, res) => {
    const { clientsId, servicesProviderId, providersId} = req.body

    await prisma.reservas.create({
      data: {
        clientsId,
        servicesProviderId,
        providersId
      }
    })

    return res.status(201).send("Reserva criada")
  })
}