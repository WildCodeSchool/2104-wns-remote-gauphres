import { getModelForClass, Prop } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class Mood {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    title?: string;

    @Prop()
    @Field()
    image?: string;
}

// TODO: do we want users in mood to maybe get all users in a mood

export const MoodModel = getModelForClass(Mood);

@InputType()
export class CreateMoodInput {
    @Field()
    title?: string;

    @Field()
    image?: string;
}
