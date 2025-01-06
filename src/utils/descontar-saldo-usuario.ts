import { prisma } from "./../lib/prisma"

interface DescontarSaldoDoUsuarioType {
  idDoUsuario: number
  saldoUsuario: number
  precoDoServico: number
}
export async function descontarSaldoDoUsuarioPeloServico({
  idDoUsuario,
  saldoUsuario, 
  precoDoServico
}: DescontarSaldoDoUsuarioType): Promise<boolean>{

  if(Number(saldoUsuario) >= Number(precoDoServico)){
  
    const novoSaldoDoUsuario = Number(saldoUsuario) - Number(precoDoServico)
    await prisma.clients.update({
      data:{
        saldo: String(novoSaldoDoUsuario)
      },
      where: {
        id: idDoUsuario
      }
    })

    return true

  }else {
    return false
  }
  
}