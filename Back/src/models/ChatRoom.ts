import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Message } from './Message';
import { User, UserChatRoomInput } from './User';

@ObjectType()
export class ChatRoom {
    @Prop()
    @Field()
    id!: string;

    @Prop()
    @Field()
    title?: string;

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
    isActiv?: boolean = true;

}
export const ChatRoomModel = getModelForClass(ChatRoom);

@InputType()
export class ChatroomCreateInput {
    @Field()
    id?: string;

    @Field()
    title?: string;

    @Field((type) => [UserChatRoomInput])
    users?: UserChatRoomInput[];

    @Field((type) => [String], { nullable: true })
    messages?: string[]

    @Field()
    isActiv?: boolean;

    @Field({ nullable: true })
    createdAt?: Date;
}
