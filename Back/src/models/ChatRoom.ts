import { getModelForClass, index, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { CreateMessageInput, Message } from './Message';
import { UserChatRoom, UserChatRoomType } from './User';

@index({ id: 'text' }, { unique: true })
@ObjectType()
export class ChatRoom {
    @Prop()
    @Field()
    id!: string;

    @Prop()
    @Field()
    title?: string;

    @Prop({ type: () => [UserChatRoomType] })
    @Field(() => [UserChatRoomType])
    chatRoomUsers?: UserChatRoomType[];

    @Prop({ type: () => [Message] })
    @Field(() => [Message])
    messages?: Message[];

    @Prop()
    @Field()
    createdAt?: Date;

    @Prop()
    @Field()
    isActiv?: boolean;
}
export const ChatRoomModel = getModelForClass(ChatRoom);

@InputType()
export class CreateChatRoomInput {
    @Field()
    id!: string;

    @Field()
    isActiv = true;

    @Field()
    title?: string;

    @Field(() => [UserChatRoom])
    chatRoomUsers?: UserChatRoom[];

    @Field(() => [CreateMessageInput])
    messages?: CreateMessageInput[];
}
