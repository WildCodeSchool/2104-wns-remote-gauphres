import { Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { chatMemberInput, User } from './User';

@ObjectType()
export class Message {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    text!: string;

    @Prop({ type: User })
    @Field((type) => User)
    author?: User;

    @Prop()
    @Field()
    createdAt?: Date;
}

@InputType()
export class CreateMessageInput {
    @Field()
    text!: string;

    @Field((type) => chatMemberInput)
    author?: chatMemberInput;

    @Field()
    createdAt: Date = new Date(Date.now());
}
