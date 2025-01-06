import type { FastifyInstance} from "fastify"
import { CreateClient } from "./client.interface"
import { prisma } from "../../lib/prisma"

export async function loginClientAuth(app: FastifyInstance){
    app.get<{Params: CreateClient}>("/login/:email/:senha", async (req, res)=>{
        const { email, senha} = req.params
        if(!email || !senha) return res.status(404).send({message:"Email e/ou Senha invalidas"})
        
        const data = await prisma.clients.findUnique({
            where:{
                email,
                AND:{
                    senha:{
                        equals: senha
                    }
                }
            }
        })

        if(!data) return res.send({message:"Usuario nao encontrado"})

        return res.send(data)
    })
}