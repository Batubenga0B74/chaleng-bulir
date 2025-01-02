import type { FastifyInstance} from "fastify"
import { CreateProvider } from "./provider.interface"
import { prisma } from "../../lib/prisma"

export async function createProviderRoute(app: FastifyInstance) {
  
  app.post<{Body: CreateProvider}>('/create', async (req, res) => {
    const { email, nif, nome, senha, descricao, preco, service_name } = req.body

    if(!email) return res.status(400).send({message: "Email is required"})

    if(!nif) return res.status(400).send({message: "Nif is required"})

    if(!nome) return res.status(400).send({message: "Name is required"})
    
    if(!senha) return res.status(400).send({message: "Password is required"})

    if(!descricao) return res.status(400).send({message: "Description is required"})

    if(!preco) return res.status(400).send({message: "Price is required"})

    
    if(!service_name) return res.status(400).send({message: "Nome do servico is required"})

    const data = await prisma.providers.create({
      data: {
        email,
        nif,
        nome,
        senha
      }
    })

    await prisma.servicesProvider.create({
      data: {
        nome: service_name,
        descricao,
        preco,
        providersId:data.id,
      }
    })

    return res.status(201).send("Provider created")

  })
}