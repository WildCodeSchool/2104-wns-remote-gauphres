import { Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Mood {
    @Prop()
    @Field()
    title?: string;

    @Prop()
    @Field()
    image?: string;
}

