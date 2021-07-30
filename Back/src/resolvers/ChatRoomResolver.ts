import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    ChatRoom,
    ChatRoomModel,
    CreateChatRoomInput,
} from '../models/ChatRoom';
import { CreateMessageInput, Message } from '../models/Message';
import Validators from '../services/Validators';

@Resolver(ChatRoom)
class ChatRoomResolver {
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

    /* @Mutation(() => ChatRoom)
    async createChatRoom(
        @Arg('data') data: CreateChatRoomInput
    ): Promise<ChatRoom> {
        const createdAt = new Date(Date.now());

        const chatRoomWithDate = { createdAt, ...data };
        const newChatRoom = await ChatRoomModel.create(chatRoomWithDate);
        await newChatRoom.save();

        // enregistre un champ userId quand un user rejoint une chatroom
        // quand un client récupére une chatroom => il est authentifier => on a son userID
        // on compare aux userIds qui sont dans la liste
        // on renvoit le user en question dans un champ graphQL "me"
        // champ graphQL "others"

        // TODO need to add the user-random-setup => createRandomChatroom
        // enregistre un champ userId = à l'id user dans la collection user
        // getRandomChatroom ??
        return newChatRoom;
    } */

    @Mutation(() => ChatRoom)
    async sendMessage(
        @Arg('id') id: string,
        @Arg('newMessage', () => CreateMessageInput) message: Message
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
            return updatedChatRoom;
        }
        throw new Error("A message can't be empty");
    }
}

export default ChatRoomResolver;
