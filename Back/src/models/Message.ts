import { Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

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
    @Field({ nullable: true })
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
}
