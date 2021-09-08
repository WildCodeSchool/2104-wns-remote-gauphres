import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';
import {
    UserCreationInput,
    UserLoginInput,
    User,
    UserModel,
    UserMoodInput,
    UserHobbiesInput,
    UserPictureInput,
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
        const user2 = await UserModel.findOne({ email: newUser.email });
        if (!user2) {
            const user = await UserModel.create(newUser);
            if (user) {
                user.createdAt = new Date(Date.now());
                user.birthDate = new Date(newUser.birthDate!);
                user.password = bcryptjs.hashSync(newUser.password!, 10);
                await user.save();
                return user;
            }
        }
        throw new Error('Invalid email');
    }

    @Mutation(() => String)
    async Login(
        @Arg('currentUser') currentUser: UserLoginInput
    ): Promise<string> {
        const user = await UserModel.findOne({ email: currentUser.email });
        if (
            user &&
            bcryptjs.compareSync(currentUser.password!, user.password!)
        ) {
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
            },
            { new: true }
        );

        return updatedUserMood;
    }

    @Mutation(() => User)
    async updateUserHobbies(
        @Arg('currentUser') currentUser: UserHobbiesInput
    ): Promise<User> {
        const updatedUserHobbies = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { hobbies: currentUser.hobbies },
            { new: true }
        );

        return updatedUserHobbies;
    }

    @Mutation(() => User)
    async updateUserPicture(
        @Arg('currentUser') currentUser: UserPictureInput
    ): Promise<User> {
        const updatedUserPicture = await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { avatar: currentUser.picture },
            { new: true }
        );

        return updatedUserPicture;
    }
}

export default UserResolver;
