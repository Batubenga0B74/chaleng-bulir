# O QUE É ESSA API


## Setup da API
1. Insatalar nodejs v20
2. Baixar o código zipado neste repositório e descompactar
3. Usar o terminal e navegar até o diretório raiz da aplicação

# DOCKER

 . quando estas no diretório roda o    docker-compose up -d
 para subir o container


 # Caso não queira usar o docker
4. Execute ```npm ci``` para instalar as dependências do projeto.
5. Para executar as migrations e configurar o banco de dados certifique-se de ter na raiz do projeto um arquivo ```.env``` e se nele tem escrito ```DATABASE_URL="file:./dev.db"``` caso não tenha então crie.
6. Execute o comando ```npx prisma migrate dev```
7. Para rodar a API no modo desenvolvedor use o comando ```npm run dev```
8. Para o modo de produção basta executar ```npm run build```  e suba o servidor com ```npm start```


## Rotas da API
### Rotas dos Clientes

>**Para criar um usuário** localhost:3333/clients/create <br/> 
<pre>
<strong style="color:yellow;">No Corpo da Requisição</strong>
{
	"nome":"Nome Completo", 
	"email":"emaildousuario", 
	"nif":"00000000", 
	"senha":"senha"
}
</pre>

>**Para fazer uma reserva** localhost:3333/reservas/listar-todas 

>**Para criar um usuário** localhost:3333/clients/reservar/idUser/idService/idProvedor<br/> 


### Rotas do Provedor

>**Para criar um Provedor** localhost:3333/providers/create <br/> 
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

>**Para Aceitar um serviço** localhost:3333/providers/aceitar/  idReserva

# chaleng-bulir
