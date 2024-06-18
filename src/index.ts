import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { TeamResolver } from './resolver/TeamResolver';
import dataSource from './db';

async function startServer() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    const schema = await buildSchema({
      resolvers: [TeamResolver],
    });

    const server = new ApolloServer({ schema });

    server.listen({ port: 4000 }, () =>
      console.log('Server is running on http://localhost:4000/graphql')
    );
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
}

startServer();
