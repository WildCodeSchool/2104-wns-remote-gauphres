import { getModelForClass, Prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Hobby } from './Hobby';

@ObjectType()
export class Question {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    texte?: string;

    @Prop()
    @Field()
    image?: string;

    @Prop({ type: Hobby })
    @Field((type) => [Hobby])
    hobbies?: Hobby[];
}

export const QuestionModel = getModelForClass(Question);
