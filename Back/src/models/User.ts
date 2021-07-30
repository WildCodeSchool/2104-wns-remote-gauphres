import { getModelForClass, index, Prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Mood, MoodInput } from './Mood';

@ObjectType()
export class User {
    @Prop()
    @Field()
    id?: string;

    @Prop()
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
    @Field(() => Mood, { nullable: true })
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

    @Field({ nullable: true })
    city?: string;

    @Field(() => [String], { nullable: true })
    hobbies?: string[];

    @Field({ nullable: true })
    createdAt?: Date;

    @Field(() => Boolean)
    isConnected = false;
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

    @Field(() => MoodInput)
    newMood?: MoodInput;
}

@InputType()
export class UserHobbiesInput {
    @Field()
    email?: string;

    @Field(() => [String])
    hobbies?: string[];
}

@InputType()
export class UserChatRoom {
    @Field()
    id?: string;

    @Field()
    username?: string;

    @Field()
    avatar?: string;

    @Field()
    isConnected?: boolean = false;

    @Field(() => [String])
    hobbies?: string[];
}

@ObjectType()
export class UserChatRoomType {
    @Prop()
    @Field()
    id?: string;

    @Prop()
    @Field()
    username?: string;

    @Prop()
    @Field()
    isConnected?: boolean = false;

    @Prop()
    @Field(() => [String])
    hobbies?: string[];
}

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
