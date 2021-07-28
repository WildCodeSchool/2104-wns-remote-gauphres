import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { ChatRoomResolver } from './resolvers/ChatRoomResolver';
import { ArticleResolver } from './resolvers/ArticleResolver';
import Fixtures from 'node-mongodb-fixtures';

const app = express();

require('dotenv').config();

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
        autoIndex: true,
        useFindAndModify: false,
    });

    console.log('Fixtures started');
    const fixtures = new Fixtures();
    fixtures
        .connect(uri)
        .then(() => fixtures.unload())
        .then(() => fixtures.load())
        .then(() => fixtures.disconnect());
    console.log('Fixtures finished');

    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            ChatRoomResolver,
            ArticleResolver,
        ],
    });

    const server = new ApolloServer({ schema, playground: true });
    const { url } = await server.listen(5000);
    console.log(`server ok on ${url}`);
}

start();
