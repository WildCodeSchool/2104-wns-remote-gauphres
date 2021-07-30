import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { CreateMessageInput, Message } from './Message';
import { User, UserChatRoom, UserChatRoomType } from './User';

@ObjectType()
export class ChatRoom {
    @Prop()
    @Field()
    id!: string;

    @Prop()
    @Field()
    title?: string;

    @Prop({ type: UserChatRoomType })
    @Field((type) => [UserChatRoomType])
    users?: UserChatRoomType[];

    @Prop({ type: Message })
    @Field((type) => [Message])
    messages?: Message[];

    @Prop()
    @Field()
    createdAt?: Date;

    @Prop()
    @Field()
    isActiv?: boolean = true;

}
export const ChatRoomModel = getModelForClass(ChatRoom);

@InputType()
export class CreateChatRoomInput {
    @Field()
    createdAt: Date = new Date(Date.now());

    @Field()
    isActiv: boolean = true;

    @Field()
    title?: string;

    @Field((type) => [UserChatRoom])
    users?: UserChatRoom[];

    @Field((type) => [CreateMessageInput])
    messages?: CreateMessageInput
}
