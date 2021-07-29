import { Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { MessageSender, User } from './User';

@ObjectType()
export class Message {
    @Prop()
    @Field()
    id?: number;

    @Prop()
    @Field()
    text!: string;

    @Prop()
    @Field()
    author?: string;

    @Prop()
    @Field()
    createdAt?: Date;
}

@InputType()
export class CreateMessageInput {
    @Field()
    id?: number;
    
    @Field()
    text!: string;

    @Field()
    author?: string;

    @Field()
    createdAt: Date = new Date(Date.now());
}
