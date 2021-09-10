import {
    PubSub,
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
    Publisher,
} from 'type-graphql';
import {
    ChatRoom,
    ChatRoomModel,
    CreateChatRoomInput,
} from '../models/ChatRoom';
import { CreateMessageInput, Message, Notification } from '../models/Message';
import Validators from '../services/Validators';

interface NotificationPayload {
    message: Message;
    chatRoomId: string;
}

@Resolver(ChatRoom)
class ChatRoomResolver {
    @Subscription({ topics: 'MESSAGES' })
    messageSent(@Root() messagePayload: NotificationPayload): Notification {
        return messagePayload;
    }

    @Query(() => [ChatRoom])
    async getAllChatRooms(): Promise<ChatRoom[]> {
        const chatrooms = await ChatRoomModel.find();
        return chatrooms;
    }

    @Query(() => ChatRoom)
    async getOneChatRoom(@Arg('id') id: string): Promise<ChatRoom> {
        const chatroom = await ChatRoomModel.findOne({
            id,
        });
        return chatroom;
    }

    @Mutation(() => ChatRoom)
    async createChatRoom(
        @Arg('newChatRoom') newChatRoom: CreateChatRoomInput
    ): Promise<ChatRoom> {
        const chatRoom = await ChatRoomModel.create(newChatRoom);
        chatRoom.createdAt = new Date(Date.now());
        chatRoom.isActiv = true;

        await chatRoom.save();
        return chatRoom;
    }

    @Mutation(() => ChatRoom)
    async sendMessage(
        @Arg('id') id: string,
        @Arg('newMessage', () => CreateMessageInput) message: Message,
        @PubSub('MESSAGES') publish: Publisher<NotificationPayload>
    ): Promise<ChatRoom> {
        if (Validators.isMessageValid(message)) {
            const createdAt = new Date(Date.now());
            const newMessage = { createdAt, ...message };
            const updatedChatRoom = await ChatRoomModel.findOneAndUpdate(
                { id },
                {
                    $push: {
                        messages: newMessage,
                    },
                }
            );
            await publish({ message: newMessage, chatRoomId: id });

            return updatedChatRoom;
        }
        throw new Error("A message can't be empty");
    }
}

export default ChatRoomResolver;
