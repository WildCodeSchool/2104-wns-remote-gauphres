import React, { FunctionComponent, ReactElement } from 'react';
import Moment from 'react-moment';
import {
    Article,
    Img,
    Avatar,
    Offline,
    Online,
    Mood,
    UserName,
    Birthday,
    Hobby,
    BirthdayCake,
} from './style';

export type UserMember = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
    isConnected: boolean;
    birthDate: Date;
    userMood: {
        title: string;
        image: string;
    };
    hobbies: string[];
};

type MemberCardProps = {
    user: UserMember;
};

export const MemberCard = ({ user }: MemberCardProps): ReactElement => {
    const emptyData = {
        avatar: '/images/avatars/default.png',
        moodIcone: '/images/avatars/default.png',
        moodTitle: 'Humeur du moment non renseignée',
    };

    const birthdayCake = {
        img:
            'https://cdn.shopify.com/s/files/1/1061/1924/files/Birthday_Cake_Emoji.png?9629857664421748268',
    };

    return (
        <Article>
            <Avatar>
                {user.avatar ? (
                    <Img src={user.avatar} alt={user.username} />
                ) : (
                    <Img src={emptyData.avatar} alt={user.username} />
                )}
                {user.isConnected ? <Online /> : <Offline />}
            </Avatar>
            <UserName>{user.username}</UserName>
            <Birthday>
                <BirthdayCake src={birthdayCake.img} />
                Son anniversaire est le
                <Moment format=" DD/MM">{user.birthDate}</Moment>
            </Birthday>
            {user.hobbies.length === 1 ? (
                <Hobby>
                    Sa passion: <br />
                    {user.hobbies}{' '}
                </Hobby>
            ) : (
                ''
            )}
            {user.hobbies.length > 1 ? (
                <Hobby>
                    Ses passions:{' '}
                    {user.hobbies.map((hobby) => (
                        <li>{hobby}</li>
                    ))}
                </Hobby>
            ) : (
                ''
            )}

            {user.userMood ? (
                <Mood
                    src={`/images/moods/${user.userMood.image}`}
                    alt={user.userMood.title}
                />
            ) : (
                <Mood
                    src="/images/moods/default.png"
                    alt={emptyData.moodTitle}
                />
            )}
        </Article>
    );
};
