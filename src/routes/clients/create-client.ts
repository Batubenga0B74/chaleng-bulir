import { prisma } from "./../../lib/prisma"
import type { FastifyInstance} from "fastify"
import { CreateClient } from "./client.interface"


export async function createClientRoute(app: FastifyInstance) {
  
  app.post<{Body: CreateClient}>('/create', async (req, res) => {
    const { email, nif, nome, senha } = req.body

    if(!nif) return res.status(400).send({message: "Nif is required"})
    if(!nome) return res.status(400).send({message: "Name is required"})
    if(!email) return res.status(400).send({message: "Email is required"})
    if(!senha) return res.status(400).send({message: "Password is required"})

    const verify = await prisma.clients.findMany({
      where:{
        email:{
          equals: email,
        },
        OR: [{nif: {equals: nif}}]
      }
    })

    if(verify.length > 0) return res.status(201).send({message: "EMAIL e/ou NIF já existem"})

    const data = await prisma.clients.create({
      data: {
        email,
        nif,
        nome,
        senha
      }
    })

    return res.status(201).send({message:"Client created", data})
  })
}