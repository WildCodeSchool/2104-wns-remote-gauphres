import { getModelForClass, Prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Hobby {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    title?: string;

    @Prop({ type: User })
    @Field((type) => [User])
    users?: User[];

    @Prop()
    @Field()
    image?: string;

    @Prop()
    @Field()
    category?: string;
}

export const HobbyModel = getModelForClass(Hobby);
