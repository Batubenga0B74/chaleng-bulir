import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { loginClientAuth } from "./routes/clients/login.route"
import { fastify, FastifyReply, FastifyRequest } from "fastify"
import {createClientRoute} from "./routes/clients/create-client"
import { loginProviderAuth } from "./routes/provider/login.route"
import { fazerReservaRoute } from "./routes/clients/reservar.route"
import { createReservaRoute } from "./routes/reservas/create.route"
import { allMyReservs } from "./routes/clients/minhas-reservas.route"
import { aceptReservaRoute } from "./routes/provider/aceptReserva.route"
import { showMyHistoricsReservs } from "./routes/provider/historics.route"
import { listarTodasReservas } from "./routes/reservas/listar-todas.route"
import {createProviderRoute} from "./routes/provider/create-provider.route"
import { listAllServicesRoute } from "./routes/services/list-services.route"
import { createServiceRoute } from "./routes/services/add-new-service.route"
import { listarReservasDoProvedorRoute } from "./routes/provider/myReservs.route"

const app = fastify()

// ROTAS DO CLIENTE
app.register(createClientRoute, {prefix:"/clients"})
app.register(fazerReservaRoute, {prefix:"/clients"})
app.register(allMyReservs, {prefix:"/clients"})
app.register(loginClientAuth, {prefix:"/clients"})

// ROTAS DO PROVEDOR
app.register(createProviderRoute, {prefix:"/providers"})
app.register(aceptReservaRoute, {prefix:"/providers"})
app.register(loginProviderAuth, {prefix:"/providers"})
app.register(showMyHistoricsReservs, {prefix:"/providers"})
app.register(listarReservasDoProvedorRoute, {prefix:"/providers/minhas-reservas"})
app.register(createServiceRoute, {prefix:"/providers"})

// ROTAS DOS SERVICOS
app.register(listAllServicesRoute, {prefix:"/services"})


// ROTAS DAS RESERVAS
app.register(createReservaRoute,{prefix:"/reservas"})
app.register(listarTodasReservas, {prefix:"/reservas"})

// AUTH JWT
app.register(jwt, {secret: "fr3udyb47ub3ng4"})

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.code(401).send({ message: 'Token inválido ou não fornecido' });
  }
})

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})



// RODAR O SERVIDOR NA PORTA 3333
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})