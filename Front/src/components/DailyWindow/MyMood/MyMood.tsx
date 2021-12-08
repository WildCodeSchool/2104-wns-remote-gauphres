import React, { FC, useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { SmallCard, MoodImage, MiniImages, MiniImage } from '../moodStyle';
import { AuthContext } from '../../../contexts/AuthContext';
import { User } from '../../../types/authContextTypes';

const UPDATE_USER_MOOD = gql`
    mutation updateUserMood($email: String!, $newMood: MoodInput!) {
        updateUserMood(currentUser: { email: $email, newMood: $newMood })
    }
`;

type MoodProps = {
    user: User | undefined | null;
};

const MyMood: FC<MoodProps> = ({ user }: MoodProps) => {
    const { user: userFromContext, refetch } = useContext(AuthContext);
    const [moodDatas, setMoodDatas] = useState(userFromContext?.userMood);
    const [updateMood] = useMutation(UPDATE_USER_MOOD);

    const OnChangeMood = async (mood: string) => {
        setMoodDatas({
            title: mood,
            image: `${mood}.png`,
        });

        await updateMood({
            variables: {
                email: userFromContext?.email,
                newMood: {
                    title: mood,
                    image: `${mood}.png`,
                },
            },
        });
        refetch();
    };

    return (
        <SmallCard>
            <p data-testid="myMood-title">Ton mood</p>
            <MoodImage
                id="main-mood"
                data-testid="myMood-image"
                src={`/images/moods/${
                    moodDatas !== null ? moodDatas?.image : 'default.png'
                }`}
                alt={user?.userMood?.title}
            />
            <p>Change-le ici</p>
            <MiniImages>
                <MiniImage
                    type="image"
                    src="/images/moods/happy.png"
                    alt={user?.userMood?.title}
                    onClick={() => OnChangeMood('happy')}
                />
                <MiniImage
                    type="image"
                    src="/images/moods/neutral.png"
                    alt={user?.userMood?.title}
                    onClick={() => OnChangeMood('neutral')}
                />
                <MiniImage
                    type="image"
                    src="/images/moods/sad.png"
                    alt={user?.userMood?.title}
                    onClick={() => OnChangeMood('sad')}
                />
            </MiniImages>
        </SmallCard>
    );
};

export default MyMood;
