import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    CreateUserInput,
    loggedUser,
    LoginUserInput,
    User,
    UserModel,
} from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';

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
    async createUser(@Arg('newUser') newUser: CreateUserInput) {
        const user = await UserModel.create(newUser);
        user.birthDate = new Date(newUser.birthDate!);
        user.password = bcrypt.hashSync(newUser.password!, 10);
        await user.save();
        return user;
    }

    @Mutation(() => String)
    async Login(@Arg('currentUser') currentUser: LoginUserInput) {
        const user = await UserModel.findOne({ email: currentUser.email })
        if (user && bcrypt.compareSync(currentUser.password!, user.password!)) {
            const moowdyToken = jwt.sign({ userId: user.id }, 'moowdyJwtKey');
            return moowdyToken;
        } else {
            throw new AuthenticationError("Invalid credentials");
        }
    }

    /* @Mutation(() => User)
    async updateUserMood(@Arg('newMood') newMood: CreateMoodInputForUser) {
        const updatedUserMood = await UserModel.findOneAndUpdate(
            { _id: newMood.userId },
            { userMood: { title: newMood.title, image: newMood.image } }
        );

        return updatedUserMood;
    } */
}
