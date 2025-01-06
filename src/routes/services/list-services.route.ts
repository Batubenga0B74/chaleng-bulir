import { prisma } from "./../../lib/prisma"
import type { FastifyInstance} from "fastify"

// LISTAR TODOS OS SERVICOS CADASTRADOS
export async function listAllServicesRoute(app: FastifyInstance) {
  app.get('/listar', async (req, res) => {
    const list = await prisma.servicesProvider.findMany()
    return list
  })
}