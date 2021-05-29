import { mongoose } from '@typegoose/typegoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    CreateMoodInputForUser,
    User,
    UserInput,
    UserModel,
} from '../models/User';

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

    // TODO: As MongoDb use random ID that we can't really use in the app
    // we don't need this query yet. It will be replace by getUserByusername.

    /* @Query(() => User)
    async getUserById(@Arg('_id') id: string) {
        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(id),
        });
        return user;
    } */

    @Mutation(() => User)
    async createUser(@Arg('data') data: UserInput) {
        const newUser = await UserModel.create(data);
        await newUser.save();
        return newUser;
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
