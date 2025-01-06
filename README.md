# O QUE É ESSA API


## Setup da API
Esta API foi feita com o Micro-framework **Fastify** do Node.Js **+ Prisma + PostgreSQL**, certifica-se de ter em node e postgres instalado na sua máquina.

1. Insatalar nodejs v20 e pqAdmin (Postgres)
2. Baixar o código zipado neste repositório e descompactar
3. Usar o terminal e navegar até o diretório raiz da aplicação
4. Execute ```npm ci``` para instalar as dependências do projeto.
5. Para executar as migrations e configurar o banco de dados certifique-se de ter na raiz do projeto um arquivo ```.env``` e se nele tem escrito ```DATABASE_URL= "COLOCAR_URL_DO_BANCO"``` caso não tenha então crie o arquivo .env e um banco de dados postgres.
6. Execute o comando ```npx prisma migrate dev```
7. Para rodar a API no modo desenvolvedor use o comando ```npm run dev```
8. Para o modo de produção basta executar ```npm run build```  e suba o servidor com ```npm start```


## Rotas da API
### Rotas dos Clientes

>**Para criar um usuário** http://localhost:3333/clients/create <br/> 
<pre>
<strong style="color:yellow;">No Corpo da Requisição</strong>
{
	"nome":"Nome Completo", 
	"email":"emaildousuario", 
	"nif":"00000000", 
	"senha":"senha"
}
</pre>

>**Para fazer o Login do Cliente** <br/> http://localhost:3333/clients/login/EMAIL_DO_CLIENTE/SENHA_DO_CLIENTE

>**Reservar um servico:** <br/> http://localhost:3333/clients/reservar/idUser/idService/idProvedor<br/> 

>**Para listar todas reservas feitas por um cliente:** <br/> http://localhost:3333/clients/minhas-reservas/idDoUsuario

### Rotas do Provedor

>**Para criar um Provedor:** <br/> http://localhost:3333/providers/create <br/> 
<pre>
<strong style="color:yellow;">No Corpo da Requisição</strong>
{
  "nome":"Nome Completo", 
  "email":"emaildousuario", 
  "nif":"00000000", 
  "senha":"senha",
  "service_name": "nome do servico",
  "descricao":" descricao",
  "preco":"000000" 
}
</pre>

>**Para fazer o Login do Provedor:** <br/> http://localhost:3333/providers/login/EMAIL_DO_PROVEDOR/SENHA_DO_PROVEDOR

>**Para litsar todas reservas feitas a um provedor:** <br/> http://localhost:3333/providers/minhas-reservas/list/idDoProvedor

>**Para Aceitar uma reserva:** <br/> http://localhost:3333/providers/aceitar/idReserva

>**Para Adicionar novos servicos:** <br/> http://localhost:3333/providers/new-service <br/>
<pre>
<strong style="color:yellow;">No Corpo da Requisição</strong>
{
  "nome": "NOME DO SERVICO", 
  "providerID": idDoProvedor,
  "descricao": "DESCRICAO DO SERVICO", 
  "preco": "0000"
}
</pre>

>**Para gerar um historico de todas suas reservas:** <br/> http://localhost:3333/providers/historicos/idDoProvedor

## Rotas dos Servicos

>**Para listar todos serviços cadastrados:** <br/> http://localhost:3333/services/listar