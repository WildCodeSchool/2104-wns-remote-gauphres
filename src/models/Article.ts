import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { ArticleCreator, User } from './User';

@ObjectType()
export class Article {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    title?: string;

    @Prop()
    @Field()
    description?: string;

    @Prop({ type: User })
    @Field((type) => User)
    author?: User;

    @Prop()
    @Field()
    createdAt?: Date;

    @Prop()
    @Field()
    url?: string;
}

export const ArticleModel = getModelForClass(Article);

@InputType()
export class CreateArticleInput {
    @Field()
    title?: string;

    @Field()
    description?: string;

    @Field((type) => ArticleCreator)
    author?: ArticleCreator;

    // TODO how to make certain that the linked article is recent ?
    // Date problems between the actual webSite article and the linkedArticle
    @Field()
    createdAt: Date = new Date(Date.now());

    @Field()
    url?: string;
}
