/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
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
        schema,
        /*  subscriptions: {
             path: '/subscriptions',
         }, */

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

    const { url } = await server.listen(5000);
    console.log(`server ok on ${url}`);
}

start();
