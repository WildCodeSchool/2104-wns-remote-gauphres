/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
    PubSub,
    PubSubEngine,
} from 'type-graphql';
import {
    ChatRoom,
    ChatRoomModel,
    CreateChatRoomInput,
} from '../models/ChatRoom';
import { CreateMessageInput, Message, Notification } from '../models/Message';
import { UserModel } from '../models/User';
import Validators from '../services/Validators';

interface NotificationPayload {
    message: Message;
    chatRoomId: string;
}

@Resolver(ChatRoom)
export default class ChatRoomResolver {
    @Subscription({ topics: 'MESSAGES'})
    messageSent(@Root() messagePayload: NotificationPayload): Notification {
        return {...messagePayload, message: { ...messagePayload.message, createdAt: new Date() }  };
    }

    @Query(() => [ChatRoom])
    async getAllChatRooms(): Promise<ChatRoom[]> {
        const chatrooms = await ChatRoomModel.find();
        return chatrooms;
    }

    @Query(() => ChatRoom)
    async getOneChatRoom(@Arg('id') id: string): Promise<ChatRoom> {
        const chatroom = await ChatRoomModel.findOne({
            _id: id,
        });
        return chatroom;
    }

    @Mutation(() => ChatRoom)
    async createChatRoom(
        @Arg('newChatRoom') newChatRoom: CreateChatRoomInput
    ): Promise<ChatRoom> {
        const user1 = await UserModel.findOne({ username: newChatRoom.chatRoomUsers[0].username });
        const user2 = await UserModel.findOne({ username: newChatRoom.chatRoomUsers[1].username });
        if (user1 && user2) {
            const chatRoom = await ChatRoomModel.create(newChatRoom);
            chatRoom.chatRoomUsers = [
                {
                    id: user1._id,
                    username: user1.username,
                    isConnected: user1.isConnected,
                    avatar: user1.avatar ? user1.avatar : "default.png",
                    hobbies: user1.hobbies ? user1.hobbies : []
                },
                {
                    id: user2._id,
                    username: user2.username,
                    isConnected: user2.isConnected,
                    avatar: user2.avatar ? user2.avatar : "default.png",
                    hobbies: user2.hobbies ? user2.hobbies : []
                }
            ];
            chatRoom.createdAt = new Date(Date.now());
            chatRoom.isActiv = true;

            await chatRoom.save();
            const savedId = chatRoom._id;

            await UserModel.findOneAndUpdate(
                { _id: user1._id },
                { chatrooms: savedId }
            )
            await UserModel.findOneAndUpdate(
                { _id: user2._id },
                { chatrooms: savedId }
            )
            return chatRoom;
        };
        throw new Error('Invalid newChatRoom');
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('id') id: string,
        @Arg('newMessage', () => CreateMessageInput) message: Message,
        @PubSub() pubSub: PubSubEngine
    ): Promise<boolean> {
        if (Validators.isMessageValid(message)) {
            const createdAt = new Date();
            const chatroom = await ChatRoomModel.findOne({ _id: id });
            const messageId = chatroom.messages.length > 0 ? (chatroom.messages.length + 1) : 1;
            const newMessage = { id: messageId, createdAt, ...message };
            await ChatRoomModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        messages: newMessage,
                    },
                }
            );
            await pubSub.publish('MESSAGES', { message: newMessage, chatRoomId: id });

            return true;
        }
        throw new Error("A message can't be empty");
    }
}
