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
    @Field((type) => [UserChatRoomType])
    chatRoomUsers?: UserChatRoomType[];

    @Prop({type: () => [Message] })
    @Field((type) => [Message])
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
    isActiv: boolean = true;

    @Field()
    title?: string;

    @Field((type) => [UserChatRoom])
    chatRoomUsers?: UserChatRoom[];

    @Field((type) => [CreateMessageInput])
    messages?:CreateMessageInput[]
}
