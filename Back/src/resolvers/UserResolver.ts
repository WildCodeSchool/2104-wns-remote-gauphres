/* eslint-disable no-underscore-dangle */
import {
    Arg,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
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
    UserInput,
    LoginUser,
    UserStatusChange,
} from '../models/User';
import { ChatRoomModel } from '../models/ChatRoom';

export type UserStatusPayload = {
    userId: string;
    newStatus: boolean;
};

@Resolver(User)
class UserResolver {
    @Subscription({ topics: 'USERSTATUS' })
    userStatusChanged(
        @Root() userStatusPayload: UserStatusPayload
    ): UserStatusChange {
        return userStatusPayload;
    }

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
    async getUserById(@Arg('_id') _id: string): Promise<User> {
        const user = await UserModel.findOne({
            _id,
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

    @Mutation(() => LoginUser)
    async Login(
        @Arg('currentUser') currentUser: UserLoginInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<LoginUser> {
        await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            { isConnected: true }
        );
        const user = await UserModel.findOne({ email: currentUser.email });
        if (user.chatrooms) {
            const chatroomToUpdate = await ChatRoomModel.findOne({
                _id: user.chatrooms,
            });
            const { chatRoomUsers } = chatroomToUpdate;
            const usersUpdated = chatRoomUsers.map((chatroomUser) => {
                if (chatroomUser.id === user._id.toString()) {
                    const chatroomUserUpdated = {
                        username: chatroomUser.username,
                        hobbies: chatroomUser.hobbies,
                        avatar: chatroomUser.avatar,
                        id: chatroomUser.id,
                        isConnected: true,
                    };

                    return chatroomUserUpdated;
                }

                return chatroomUser;
            });
            const result = await ChatRoomModel.findOneAndUpdate(
                { _id: user.chatrooms },
                { chatRoomUsers: usersUpdated },
                { new: true }
            );
            if (!result) throw new Error('chatroom not updated');
        }
        await pubSub.publish('USERSTATUS', {
            userId: user._id,
            newStatus: true,
        });

        if (
            user &&
            bcryptjs.compareSync(currentUser.password!, user.password!)
        ) {
            const token = jwt.sign(
                { userEmail: user.email },
                process.env.JWT_KEY
            );
            return { user, token };
        }
        throw new AuthenticationError('Invalid credentials');
    }

    @Mutation(() => Boolean)
    async updateUserMood(
        @Arg('currentUser') currentUser: UserMoodInput
    ): Promise<boolean> {
        await UserModel.findOneAndUpdate(
            { email: currentUser.email },
            {
                userMood: {
                    title: currentUser.newMood?.title,
                    image: currentUser.newMood?.image,
                },
            },
            { new: true }
        );

        return true;
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

    @Mutation(() => User)
    async updateUser(
        @Arg('userId') userId: string,
        @Arg('currentUser') currentUser: UserInput
    ): Promise<User> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { email: currentUser.email, username: currentUser.username },
            { new: true }
        );

        return updatedUser;
    }

    @Mutation(() => User)
    async logout(
        @Arg('userId') userId: string,
        @PubSub() pubSub: PubSubEngine
    ): Promise<User> {
        const logout = await UserModel.findOneAndUpdate(
            { _id: userId },
            { isConnected: false }
        );
        if (logout.chatrooms) {
            if (logout.chatrooms) {
                const chatroomToUpdate = await ChatRoomModel.findOne({
                    _id: logout.chatrooms,
                });
                const { chatRoomUsers } = chatroomToUpdate;
                const usersUpdated = chatRoomUsers.map((chatroomUser) => {
                    if (chatroomUser.id === logout._id.toString()) {
                        const chatroomUserUpdated = {
                            username: chatroomUser.username,
                            hobbies: chatroomUser.hobbies,
                            avatar: chatroomUser.avatar,
                            id: chatroomUser.id,
                            isConnected: false,
                        };
                        return chatroomUserUpdated;
                    }

                    return chatroomUser;
                });
                const result = await ChatRoomModel.findOneAndUpdate(
                    { _id: logout.chatrooms },
                    { chatRoomUsers: usersUpdated },
                    { new: true }
                );
                if (!result) throw new Error('chatroom not updated');
            }
        }
        await pubSub.publish('USERSTATUS', {
            userId,
            newStatus: false,
        });

        return logout;
    }
}

export default UserResolver;
