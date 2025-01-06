import type { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import { descontarSaldoDoUsuarioPeloServico } from "../../utils/descontar-saldo-usuario"

export async function fazerReservaRoute(app: FastifyInstance) {
  app.post<{Params: {idUser: number, idService: number, idProvedor: number}}>('/reservar/:idUser/:idService/:idProvedor', async (req, res) => {
    const { idUser, idService, idProvedor } = req.params

    const verifyUser = await prisma.clients.findUnique({
      where: {
        id: Number(idUser)
      }
    })

    verifyUser?.saldo

    const verifyService = await prisma.servicesProvider.findUnique({
      where: {
        id: Number(idService),
        AND: {
          providersId: Number(idProvedor)
        }
      }
    }) 
    
    verifyService?.preco

    if(!verifyService || !verifyUser) return res.send({message:"Usuário, Provedor ou servico não encontrado."})

    // FUNCAO PARA VERIFICAR SALDO DO USUARIO E DESCONTAR O VALOR DO SERVICO
    const result = await descontarSaldoDoUsuarioPeloServico({
      idDoUsuario: Number(idUser), 
      precoDoServico: Number(verifyService.preco), 
      saldoUsuario: Number(verifyUser.saldo)
    })

    if(!result) return res.send({message:"Saldo insuficiente"})

    const data = await prisma.reservas.create({
      data:{
        clientsId: Number(idUser),
        servicesProviderId: Number(idService),
        providersId: Number(idProvedor)
      }
    })

    await prisma.historys.create({
      data:{
        reservasId: data.id
      }
    })

    return res.status(200).send({message:"Servico reservado com sucesso!"}) 
  })
}