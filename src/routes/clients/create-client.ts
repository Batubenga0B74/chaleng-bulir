import { prisma } from "./../../lib/prisma"
import type { FastifyInstance} from "fastify"
import { CreateClient } from "./client.interface"


export async function createClientRoute(app: FastifyInstance) {
  
  app.post<{Body: CreateClient}>('/create', async (req, res) => {
    const { email, nif, nome, senha } = req.body

    if(!email) return res.status(400).send({message: "Email is required"})

    if(!nif) return res.status(400).send({message: "Nif is required"})

    if(!nome) return res.status(400).send({message: "Name is required"})
    
    if(!senha) return res.status(400).send({message: "Password is required"})

    await prisma.clients.create({
      data: {
        email,
        nif,
        nome,
        senha
      }
    })

    return res.status(201).send("Client created")
  })
}