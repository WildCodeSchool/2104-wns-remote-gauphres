import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Mood {
    @Field()
    title?: string;

    @Field()
    image?: string;
}

