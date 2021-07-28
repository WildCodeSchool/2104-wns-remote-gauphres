import { Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { MessageSender, User } from './User';

@ObjectType()
export class Message {
    @Field()
    id?: number;

    @Field()
    text!: string;

    @Field()
    author?: string;

    @Field()
    createdAt?: Date;
}

@InputType()
export class CreateMessageInput {
    @Field()
    text!: string;

    @Field((type) => MessageSender)
    author?: MessageSender;

    @Field()
    createdAt: Date = new Date(Date.now());
}
