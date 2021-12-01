/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import http from "http";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import Fixtures from 'node-mongodb-fixtures';
import { AuthenticationError } from 'apollo-server-errors';
import UserResolver from './resolvers/UserResolver';
import ChatRoomResolver from './resolvers/ChatRoomResolver';

const app = express();
const moowdyJwtKey = process.env.REACT_APP_JWT_SECRET_KEY;
const httpServer = http.createServer(app);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function start() {
    // Connect to Mongo docker image
    const uri = `mongodb://mongodb:27017/moowdyDb`;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
        useFindAndModify: false,
    });

    // Add fixtures in the DB
    console.log('Fixtures started');
    const fixtures = new Fixtures();
    fixtures
        .connect(uri)
        .then(() => fixtures.unload())
        .then(() => fixtures.load())
        .then(() => fixtures.disconnect());
    console.log('Fixtures finished');

    const schema = await buildSchema({
        resolvers: [UserResolver, ChatRoomResolver],
    });

    const server = new ApolloServer({
        cors:{origin:'*', credentials: true},
        schema,
        subscriptions: {
            path: "/subscriptions",
            onConnect: () => {
              console.log("Client connected for subscriptions");
            },
            onDisconnect: () => {
              console.log("Client disconnected from subscriptions");
            },
          },
        playground: true/* (process.env.NODE_ENV !== 'production') */,
        // Requests interceptor
        context: ({ req }) => {
            if (req) {
                const moowdyToken = req.headers.authorization;
                if (moowdyToken) {
                    let payload;
                    try {
                        payload = jwt.verify(moowdyToken, moowdyJwtKey);
                        return payload;
                    } catch (err) {
                        throw new AuthenticationError('Bad token');
                    }
                }
                return req;
            }
            return null;
        },
    });

    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
    );
    });

    const { url } = await server.listen(5000);
    console.log(`server ok on ${url}`);
}

start();
