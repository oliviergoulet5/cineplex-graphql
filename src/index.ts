import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { CineplexDataSource } from './CineplexDataSource';
import { createSchema } from './utils/createSchema';

const main = async () => {
    const app = express();

    const server = new ApolloServer({
        schema: await createSchema(),
        dataSources: () => {
            return {
                cineplexAPI: new CineplexDataSource()
            };
        }
    });

    await server.start();

    server.applyMiddleware({ app });

    app.listen({ port: 4332 }, () => console.log("Server running on port 4332."));
}

main().catch(err => console.error(err));