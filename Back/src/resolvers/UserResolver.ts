import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import {
    UserCreationInput,
    UserLoginInput,
    User,
    UserModel,
    UserMoodInput,
    UserHobbiesInput,
} from '../models/User';

@Resolver(User)
class UserResolver {
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await UserModel.find();
        return users;
    }

    @Query(() => User)
    async getUserByEmail(@Arg('email') email: string): Promise<User> {
        const user = await UserModel.findOne({
            email,
        });
        return user;
    }

    @Query(() => User)
    async getUserByUsername(@Arg('username') username: string): Promise<User> {
        const user = await UserModel.findOne({
            username,
        });
        return user;
    }

    @Query(() => [User])
    async getUsersConnected(): Promise<User[]> {
        const users = await UserModel.find({ isConnected: true });
        return users;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('newUser') newUser: UserCreationInput
    ): Promise<User> {
        const user = await UserModel.create(newUser);
        if (user) {
            user.createdAt = new Date(Date.now());
            user.birthDate = new Date(newUser.birthDate!);
            user.password = bcrypt.hashSync(newUser.password!, 10);
        }
        await user.save();
        return user;
    }

    @Mutation(() => String)
    async Login(
        @Arg('currentUser') currentUser: UserLoginInput
    ): Promise<string> {
        const user = await UserModel.findOne({ email: currentUser.email });
        if (user && bcrypt.compareSync(currentUser.password!, user.password!)) {
            const moowdyToken = jwt.sign(
                { userEmail: user.email },
                'moowdyJwtKey'
            );
            return moowdyToken;
        }
        throw new AuthenticationError('Invalid credentials');
    }

    @Mutation(() => User)
    async updateUserMood(
        @Arg('currentUser') currentUser: UserMoodInput
    ): Promise<User> {
        const updatedUserMood = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            {
                userMood: {
                    title: currentUser.newMood?.title,
                    image: currentUser.newMood?.image,
                },
            }
        );

        return updatedUserMood; // That return the previous mood in the playground
    }

    @Mutation(() => User)
    async updateUserHobbies(
        @Arg('currentUser') currentUser: UserHobbiesInput
    ): Promise<User> {
        const updatedUserHobbies = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { hobbies: currentUser.hobbies }
        );

        return updatedUserHobbies; // That return the previous hobbies in the playground
    }
}

export default UserResolver;
