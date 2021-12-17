import { CardActions, Collapse, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import Moment from 'react-moment';
import {
    Card,
    Img,
    Avatar,
    Offline,
    Online,
    Mood,
    Birthday,
    Hobby,
    BirthdayCake,
    CardHeader,
    CardContent,
    ExpandIcon,
    IconButton,
    HobbyCardContent,
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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getAllFirstLettersUpperCase = (str: string): string => {
        const words = str.split(' ');
        words.forEach((word: string, i: number) => {
            words[i] = word[0].toUpperCase() + word.slice(1);
        });
        return words.join(' ');
    };

    const emptyData = {
        avatar: '/images/avatars/default.png',
        moodIcone: '/images/avatars/default.png',
        moodTitle: 'Current mood not specified',
    };

    const birthdayCake = {
        img:
            'https://cdn.shopify.com/s/files/1/1061/1924/files/Birthday_Cake_Emoji.png?9629857664421748268',
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="avatar">
                        {user.avatar ? (
                            <Img
                                src={`/images/avatars/${user.avatar}`}
                                alt={user.username}
                            />
                        ) : (
                            <Img src={emptyData.avatar} alt={user.username} />
                        )}
                        {user.isConnected ? <Online /> : <Offline />}
                    </Avatar>
                }
                title={user.username}
            />
            <CardContent>
                <Birthday>
                    <BirthdayCake src={birthdayCake.img} />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Birthday
                        <Moment format=" DD/MM">{user.birthDate}</Moment>
                    </Typography>
                </Birthday>
            </CardContent>
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
            <CardActions>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {user.hobbies.length < 2 ? (
                        <p>Show her hobby</p>
                    ) : (
                        <p>Show his hobbies</p>
                    )}
                    <ExpandIcon rotate={expanded ? 1 : 0} />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <HobbyCardContent>
                    {user.hobbies.map((hobby) => (
                        <Hobby key={hobby}>
                            {getAllFirstLettersUpperCase(hobby)}
                        </Hobby>
                    ))}
                </HobbyCardContent>
            </Collapse>
        </Card>
    );
};
