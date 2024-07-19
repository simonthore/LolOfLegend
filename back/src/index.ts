import "reflect-metadata"; // Nécessaire pour TypeORM
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TeamResolver } from "./resolver/TeamResolver"; // Exemple de résolveur pour les utilisateurs
import { AppDataSource } from "./data-source"; // Fichier de configuration de la base de données

(async () => {
  // Initialisation de la connexion à la base de données type-graphqlavec TypeORM
  await createConnection(AppDataSource);

  // Initialisation d'Express
  const app = express();

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
