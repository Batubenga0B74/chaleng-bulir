import { prisma } from "../../lib/prisma"
import type { FastifyInstance} from "fastify"
import { CreateProvider } from "./provider.interface"

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

    // SABER SE PROVEDOR JA EXISTE
    const verify = await prisma.providers.findMany({
      where:{
        email:{
          equals: email,
        },
        OR: [{nif: {equals: nif}}]
      }
    })

    if(verify.length > 0) return res.status(201).send({message: "EMAIL e/ou NIF já existem"})

    // CRIAR PROVEDOR
    const data = await prisma.providers.create({
      data: {
        email,
        nif,
        nome,
        senha
      }
    })

    // CRIAR SERVICO
    await prisma.servicesProvider.create({
      data: {
        nome: service_name,
        descricao,
        preco,
        providersId:data.id,
      }
    })

    return res.status(201).send({message:"Provider created", data})

  })
}