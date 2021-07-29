import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    UserCreationInput,
    UserLoginInput,
    User,
    UserModel,
    UserMoodInput,
    UserHobbiesInput,
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
    async createUser(@Arg('newUser') newUser: UserCreationInput) {
        const user = await UserModel.create(newUser);
        user.createdAt = new Date(Date.now());
        user.birthDate = new Date(newUser.birthDate!);
        user.password = bcrypt.hashSync(newUser.password!, 10);
        await user.save();
        return user;
    }

    @Mutation(() => String)
    async Login(@Arg('currentUser') currentUser: UserLoginInput) {
        const user = await UserModel.findOne({ email: currentUser.email })
        if (user && bcrypt.compareSync(currentUser.password!, user.password!)) {
            const moowdyToken = jwt.sign({ userEmail: user.email }, 'moowdyJwtKey');
            return moowdyToken;
        } else {
            throw new AuthenticationError("Invalid credentials");
        }
    }

    @Mutation(() => User)
    async updateUserMood(@Arg('currentUser') currentUser: UserMoodInput) {
        const updatedUserMood = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { userMood: { title: currentUser.newMood?.title, image: currentUser.newMood?.image } }
        );

        return updatedUserMood; // That return the previous mood in the playground
    }

    @Mutation(() => User)
    async updateUserHobbies(@Arg('currentUser') currentUser: UserHobbiesInput) {
        const updatedUserHobbies = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { hobbies: currentUser.hobbies }
        )

        return updatedUserHobbies; // That return the previous hobbies in the playground
    }
}
