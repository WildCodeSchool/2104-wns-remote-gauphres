import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { ChatRoomResolver } from './resolvers/ChatRoomResolver';
import { ArticleResolver } from './resolvers/ArticleResolver';
import { MoodResolver } from './resolvers/MoodResolver';

const app = express();

require('dotenv').config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function start() {
    // Connect to Atlas DB
    const uri = `mongodb+srv://gauphreAdmin:OALByCtSaYHbDHaG@moowdydb.afpoa.mongodb.net/moowdyDb?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false,
    });

    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            ChatRoomResolver,
            ArticleResolver,
            MoodResolver,
        ],
    });

    const server = new ApolloServer({ schema, playground: true });
    const { url } = await server.listen(5000);
    console.log(`server ok on ${url}`);
}

start();
