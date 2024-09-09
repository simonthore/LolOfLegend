import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TeamResolver } from "./resolver/TeamResolver";
import { AppDataSource } from "./data-source";
import axios from "axios";

(async () => {
  // Initialisation de la connexion à la base de données avec TypeORM
  await createConnection(AppDataSource);

  // Initialisation d'Express
  const app = express();

  // Utilisation du middleware CORS
  app.use(cors());

  // Initialisation d'Apollo Server avec votre schéma GraphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TeamResolver], // Ajoutez d'autres résolveurs au besoin
      validate: false,
    }),
  });
  await apolloServer.start();

  // Middleware pour connecter Apollo Server à Express
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  // Définir un point de terminaison pour l'API
  app.get('/api/summoner/:summonerName/:region', async (req, res) => {
    const { summonerName, region } = req.params;
    const API_KEY = 'RGAPI-b506622c-ca6e-41b7-82a2-c628e831645c'; // Remplacez avec votre clé API
    try {
      const response = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${region}?api_key=${API_KEY}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Erreur lors de la récupération des données');
    }
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/graphql`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying another port...`);
      app.listen(port + 1);
    } else {
      console.error(err);
    }
  });
})();
