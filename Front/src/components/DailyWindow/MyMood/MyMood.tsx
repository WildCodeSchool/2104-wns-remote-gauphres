import React, { FC } from 'react';
import { User } from '../../../contexts/UserContext';
import SmallCard from '../moodStyle';

type MoodProps = {
    user: User | undefined | null;
};

const MyMood: FC<MoodProps> = ({ user }: MoodProps) => {
    console.log('user', user);

    return (
        <SmallCard>
            <p data-testid="myMood-title">Ton mood du jour</p>
            {/* <p data-testid="myMood-title">{user?.userMood?.title}</p> */}
            <img
                data-testid="myMood-image"
                src={`/images/moods/${user?.userMood?.image}`}
                alt={user?.userMood?.title}
            />
        </SmallCard>
    );
};

export default MyMood;
