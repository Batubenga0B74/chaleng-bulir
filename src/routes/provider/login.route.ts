import type { FastifyInstance} from "fastify"
import { prisma } from "../../lib/prisma"
import { CreateProvider } from "./provider.interface"

export async function loginProviderAuth(app: FastifyInstance){
    app.get<{Params: CreateProvider}>("/login/:email/:senha", async (req, res)=>{
        const { email, senha} = req.params
        if(!email || !senha) return res.status(404).send({message:"Email e/ou Senha invalidas"})
        
        const data = await prisma.providers.findUnique({
            where:{
                email,
                AND:{
                    senha:{
                        equals: senha
                    }
                }
            }
        })

        if(!data) return res.status(404).send({message:"Usuario nao encontrado"})

        return res.send(data)
    })
}