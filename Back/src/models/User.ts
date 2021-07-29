import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Mood } from './Mood';

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
    createdAt?: Date;

    @Prop()
    @Field((type) => Mood, { nullable: true })
    userMood?: Object;
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
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
    createdAt?: Date = new Date(Date.now());

    @Field()
    isConnected: boolean = false;

}

@InputType()
export class LoginUserInput {
    @Field()
    email?: string;

    @Field()
    password?: string;
}

// TODO: beside to refacto
@InputType()
export class UserChatRoom {
    @Field()
    username?: string;

    @Field()
    avatar?: string;

    @Field()
    isConnected?: boolean = false;
}

@ObjectType()
export class UserChatRoomType {
    @Prop()
    @Field()
    username?: string;

    @Prop()
    @Field()
    avatar?: string;

    @Prop()
    @Field()
    isConnected?: boolean = false;
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

@ObjectType()
export class UserWithToken {
    @Field()
    accessToken!: string;
    @Field()
    user!: User;
}

@InputType()
export class LoginInput {
    @Field()
    email!: string;
    @Field()
    password!: string;
}

@InputType()
export class CreateMoodInputForUser {
    @Field()
    userId!: string;

    @Field()
    title!: string;

    @Field()
    image!: string;
}