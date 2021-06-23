import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateMoodInput, Mood, MoodModel } from '../models/Mood';

@Resolver(Mood)
export class MoodResolver {
    @Query(() => [Mood])
    async getAllMoods(): Promise<Mood[]> {
        const moods = await MoodModel.find();
        return moods;
    }

    @Mutation(() => Mood)
    async createMood(@Arg('data') data: CreateMoodInput): Promise<Mood> {
        const newMood = await MoodModel.create(data);
        await newMood.save();
        return newMood;
    }
}
