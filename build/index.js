"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Nécessaire pour TypeORM
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const TeamResolver_1 = require("./resolver/TeamResolver"); // Exemple de résolveur pour les utilisateurs
const data_source_1 = require("./data-source"); // Fichier de configuration de la base de données
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Initialisation de la connexion à la base de données type-graphqlavec TypeORM
    yield (0, typeorm_1.createConnection)(data_source_1.AppDataSource);
    // Initialisation d'Express
    const app = (0, express_1.default)();
    // Initialisation d'Apollo Server avec votre schéma GraphQL
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [TeamResolver_1.TeamResolver],
            validate: false,
        }),
    });
    yield apolloServer.start();
    // Middleware pour connecter Apollo Server à Express
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    const port = 4000;
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}/graphql`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use. Trying another port...`);
            app.listen(port + 1);
        }
        else {
            console.error(err);
        }
    });
}))();
