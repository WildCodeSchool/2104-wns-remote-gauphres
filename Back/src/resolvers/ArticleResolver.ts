import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Article, ArticleModel, CreateArticleInput } from '../models/Article';

@Resolver(Article)
export class ArticleResolver {
    @Query(() => [Article])
    async getAllArticles(): Promise<Article[]> {
        const articles = await ArticleModel.find();
        return articles;
    }
    @Mutation(() => Article)
    async createArticle(
        @Arg('data') data: CreateArticleInput
    ): Promise<Article> {
        const newArticle = await ArticleModel.create(data);
        // TODO: make the author automaticly added for the actual user
        await newArticle.save();
        return newArticle;
    }
}
