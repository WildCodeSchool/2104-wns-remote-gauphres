import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Message } from './Message';
import { User, UserChatRoom } from './User';

@ObjectType()
export class ChatRoom {
    @Prop()
    @Field()
    id!: string;

    @Prop({ type: User })
    @Field((type) => [User])
    users?: User[];

    @Prop({ type: Message })
    @Field((type) => [Message])
    messages?: Message[];

    @Prop()
    @Field()
    createdAt?: Date;

    @Prop()
    @Field()
    isActiv?: Boolean;

    @Prop()
    @Field()
    title?: string;
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
}
