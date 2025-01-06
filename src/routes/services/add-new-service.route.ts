import { prisma } from "../../lib/prisma"
import type { FastifyInstance} from "fastify"
import { CreateService } from "./service.interface"

// Rota de criação de servico
export async function createServiceRoute(app: FastifyInstance) {
  
  app.post<{Body: CreateService}>('/new-service', async (req, res) => {
    const { nome, descricao, preco, providerID} = req.body

    const provider = await prisma.providers.findUnique({
      where: {
        id: providerID
      }
    })

    if (provider === null) return res.status(400).send({message: "Provider not found"})

      if(!nome) return res.status(400).send({message: "Informe o nome do servico"})
      if(!descricao) return res.status(400).send({message: "Informe Descrição do servico"})
      if(!preco) return res.status(400).send({message: "Informe Preço do servico"})

      await prisma.servicesProvider.create({
        data: {
          nome,
          descricao,
          preco,
          providersId: providerID
        }
      })

    return res.status(201).send({message: "Serviço criado"})
  })
}