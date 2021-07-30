import { getModelForClass, index, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Mood, MoodInput } from './Mood';

@ObjectType()
export class User {
    @Prop()
    @Field()
    id?: string;

    @Prop({ unique: true })
    @Field()
    username?: string;

    @Prop()
    @Field()
    firstname?: string;

    @Prop()
    @Field()
    lastname?: string;

    @Prop()
    @Field()
    password?: string;

    @Prop()
    @Field(() => [String], { nullable: true })
    chatrooms?: string[];

    @Prop()
    @Field(() => [String], { nullable: true })
    hobbies?: string[];

    @Prop()
    @Field({ nullable: true })
    avatar?: string;

    @Prop()
    @Field()
    isConnected?: boolean;

    @Prop({ unique: true })
    @Field()
    email?: string;

    @Prop()
    @Field()
    birthDate?: Date;

    @Prop()
    @Field()
    city?: string;

    @Prop()
    @Field()
    createdAt?: Date;

    @Prop()
    @Field((type) => Mood, { nullable: true })
    userMood?: Mood;
}

export const UserModel = getModelForClass(User);

@InputType()
export class UserCreationInput {
    @Field()
    username?: string;

    @Field()
    firstname?: string;

    @Field()
    lastname?: string;

    @Field()
    password?: string;

    @Field()
    email?: string;

    @Field()
    birthDate?: Date;

    @Field()
    city?: string;

    @Field((type) => [String], { nullable: true })
    hobbies?: string[];

    @Field({ nullable: true })
    createdAt?: Date;

    @Field()
    isConnected: boolean = false;

}

@InputType()
export class UserLoginInput {
    @Field()
    email?: string;

    @Field()
    password?: string;
}

@InputType()
export class UserMoodInput {
    @Field()
    email?: string;

    @Field((type) => MoodInput)
    newMood?: MoodInput;
}

@InputType()
export class UserHobbiesInput {
    @Field()
    email?: string;

    @Field((type) => [String])
    hobbies?: string[];
}

@InputType()
export class UserChatRoomInput {
    @Field()
    id?: string;

    @Field()
    username?: string;

    @Field()
    avatar?: string;

    @Field((type) => [String])
    hobbies?: string[];

    @Field((type) => MoodInput)
    userMood?: MoodInput;

    @Field()
    isConnected?: boolean;

}


// TODO: beside to refacto


@InputType()
export class MessageSender {
    @Field()
    id!: string;

    @Field()
    username!: string;
}

@InputType()
export class ArticleCreator {
    @Field()
    username!: string;
}