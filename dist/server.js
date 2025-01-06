"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const login_route_1 = require("./routes/clients/login.route");
const fastify_1 = require("fastify");
const create_client_1 = require("./routes/clients/create-client");
const login_route_2 = require("./routes/provider/login.route");
const reservar_route_1 = require("./routes/clients/reservar.route");
const create_route_1 = require("./routes/reservas/create.route");
const minhas_reservas_route_1 = require("./routes/clients/minhas-reservas.route");
const aceptReserva_route_1 = require("./routes/provider/aceptReserva.route");
const historics_route_1 = require("./routes/provider/historics.route");
const listar_todas_route_1 = require("./routes/reservas/listar-todas.route");
const create_provider_route_1 = require("./routes/provider/create-provider.route");
const list_services_route_1 = require("./routes/services/list-services.route");
const add_new_service_route_1 = require("./routes/services/add-new-service.route");
const myReservs_route_1 = require("./routes/provider/myReservs.route");
const app = (0, fastify_1.fastify)();
// ROTAS DO CLIENTE
app.register(create_client_1.createClientRoute, { prefix: "/clients" });
app.register(reservar_route_1.fazerReservaRoute, { prefix: "/clients" });
app.register(minhas_reservas_route_1.allMyReservs, { prefix: "/clients" });
app.register(login_route_1.loginClientAuth, { prefix: "/clients" });
// ROTAS DO PROVEDOR
app.register(create_provider_route_1.createProviderRoute, { prefix: "/providers" });
app.register(aceptReserva_route_1.aceptReservaRoute, { prefix: "/providers" });
app.register(login_route_2.loginProviderAuth, { prefix: "/providers" });
app.register(historics_route_1.showMyHistoricsReservs, { prefix: "/providers" });
app.register(myReservs_route_1.listarReservasDoProvedorRoute, { prefix: "/providers/minhas-reservas" });
app.register(add_new_service_route_1.createServiceRoute, { prefix: "/providers" });
// ROTAS DOS SERVICOS
app.register(list_services_route_1.listAllServicesRoute, { prefix: "/services" });
// ROTAS DAS RESERVAS
app.register(create_route_1.createReservaRoute, { prefix: "/reservas" });
app.register(listar_todas_route_1.listarTodasReservas, { prefix: "/reservas" });
// AUTH JWT
app.register(jwt_1.default, { secret: "fr3udyb47ub3ng4" });
app.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (error) {
        reply.code(401).send({ message: 'Token inválido ou não fornecido' });
    }
});
app.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
// RODAR O SERVIDOR NA PORTA 3333
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running!');
});
