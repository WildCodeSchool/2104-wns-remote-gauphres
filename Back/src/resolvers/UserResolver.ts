import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    CreateMoodInputForUser,
    CreateUserInput,
    User,
    UserModel,
    UserWithToken,
} from '../models/User';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
            { isConnected: true }
        );
        return users;
    }

    @Mutation(() => User)
    async createUser(@Arg('data') data: CreateUserInput) {
        const user = await UserModel.create(data);
        user.birthDate = new Date(data.birthDate!);
        user.password = bcrypt.hashSync(data.password!, 10);
        await user.save();
        return user;
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
