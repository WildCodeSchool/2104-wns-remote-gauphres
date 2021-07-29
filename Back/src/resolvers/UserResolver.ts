import { mongoose } from '@typegoose/typegoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    CreateMoodInputForUser,
    User,
    UserInput,
    UserModel,
    UserWithToken,
} from '../models/User';
import { sign } from 'jsonwebtoken';

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await UserModel.find();
        return users;
    }

    @Query(() => User)
    async getUserByEmail(@Arg('email') email: string) {
        const user = await UserModel.findOne({
            email: email,
        });
        return user;
    }

    @Query(() => User)
    async getUserByUsername(@Arg('username') username: string) {
        const user = await UserModel.findOne({
            username: username,
        });
        return user;
    }

    @Query(() => [User])
    async getUsersConnected(): Promise<User[]> {
        const users = await UserModel.find(
            { isConnected:true }
        );
        return users;
    }

    // TODO: As MongoDb use random ID that we can't really use in the app
    // we don't need this query yet. It will be replace by getUserByusername.

    /* @Query(() => User)
    async getUserById(@Arg('_id') id: string) {
        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(id),
        });
        return user;
    } */

    @Mutation(() => UserWithToken)
    async createUser(@Arg('data') data: UserInput) {
        const user = await UserModel.create(data);
        user.birthDate = new Date(data.birthDate!);
        await user.save();
        return {
            user,
            accessToken: sign({ userId: user.id }, 'secretJWT')
        };
    }

    @Mutation(() => UserWithToken)
    async Login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<UserWithToken> {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            throw new Error('Cet utilisateur est introuvable')
        }
        return {
            user,
            accessToken: sign({ userId: user.id }, 'secretJWT')
        };
    }

    @Mutation(() => User)
    async updateUserMood(@Arg('newMood') newMood: CreateMoodInputForUser) {
        const updatedUserMood = await UserModel.findOneAndUpdate(
            { _id: newMood.userId },
            { userMood: { title: newMood.title, image: newMood.image } }
        );

        return updatedUserMood;
    }
}
