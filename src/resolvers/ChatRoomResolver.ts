import { mongoose } from '@typegoose/typegoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
    ChatRoom,
    ChatRoomModel,
    CreateChatRoomInput,
} from '../models/ChatRoom';
import { CreateMessageInput, Message } from '../models/Message';
import { Validators } from '../services/Validators';

@Resolver(ChatRoom)
export class ChatRoomResolver {
    @Query(() => [ChatRoom])
    async getAllChatRooms(): Promise<ChatRoom[]> {
        const chatrooms = await ChatRoomModel.find();
        return chatrooms;
    }

    @Query(() => ChatRoom)
    async getOneChatRoom(@Arg('_id') id: string) {
        const chatroom = await ChatRoomModel.findOne({
            _id: new mongoose.Types.ObjectId(id),
        });
        return chatroom;
    }

    @Mutation(() => ChatRoom)
    async createChatRoom(
        @Arg('data') data: CreateChatRoomInput
    ): Promise<ChatRoom> {
        const newChatRoom = await ChatRoomModel.create(data);
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
    }

    @Mutation(() => ChatRoom)
    async sendMessage(
        @Arg('_id') _id: string,
        @Arg('newMessage', () => CreateMessageInput) message: Message
    ) {
        if (Validators.isMessageValid(message)) {
            const updatedChatRoom = await ChatRoomModel.findOneAndUpdate(
                { _id: _id },
                {
                    $push: {
                        messages: message,
                    },
                }
            );
            return updatedChatRoom;
        } else {
            throw new Error("A message can't be empty");
        }
    }
}
