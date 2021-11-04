/* eslint-disable prettier/prettier */
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
import { UserModel } from '../models/User';
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
                 id: user1['_id'],
                 username: user1.username, 
                 isConnected: user1.isConnected,
                 avatar: user1.avatar ? user1.avatar : "https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg", 
                 hobbies: user1.hobbies ? user1.hobbies : []  
             }, 
             {
                 id: user2['_id'] , 
                 username: user2.username, 
                 isConnected: user2.isConnected, 
                 avatar: user2.avatar ? user2.avatar : "https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg", 
                 hobbies: user2.hobbies ? user2.hobbies : []}
        ];
        chatRoom.createdAt = new Date(Date.now());
        chatRoom.isActiv = true;

        await chatRoom.save();
        return chatRoom;  
        };
        throw new Error('Invalid newChatRoom');
    }

    @Mutation(() => ChatRoom)
    async sendMessage(
        @Arg('id') id: string,
        @Arg('newMessage', () => CreateMessageInput) message: Message,
        @PubSub('MESSAGES') publish: Publisher<NotificationPayload>
    ): Promise<ChatRoom> {
        if (Validators.isMessageValid(message)) {
            const createdAt = new Date(Date.now());
            const chatroom = await ChatRoomModel.findOne({_id: id});
            const messageId = chatroom.messages.length > 0 ? (chatroom.messages.length + 1) : 1;
            const newMessage = { id: messageId, createdAt, ...message };
            const updatedChatRoom = await ChatRoomModel.findOneAndUpdate(
                { _id: id },
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
