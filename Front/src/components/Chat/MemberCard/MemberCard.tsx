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
        avatar:
            'https://i.pinimg.com/280x280_RS/90/de/a4/90dea4c0841a7416413242b525286a1b.jpg',
        moodIcone:
            'https://i.pinimg.com/280x280_RS/90/de/a4/90dea4c0841a7416413242b525286a1b.jpg',
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
                <Hobby>Sa passion: {user.hobbies} </Hobby>
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
                <Mood src={user.userMood.image} alt={user.userMood.title} />
            ) : (
                <Mood src={emptyData.moodIcone} alt={emptyData.moodTitle} />
            )}
        </Article>
    );
};
