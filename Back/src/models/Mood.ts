import { Prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Mood {
    @Prop()
    @Field()
    title?: string;

    @Prop()
    @Field()
    image?: string;
}

@InputType()
export class MoodInput {
    @Field()
    title?: string;

    @Field()
    image?: string;
}