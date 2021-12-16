import React, { FC, useState, useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { SmallCard, MoodImage, MiniImages, MiniImage } from '../moodStyle';
import { AuthContext } from '../../../contexts/AuthContext';

const UPDATE_USER_MOOD = gql`
    mutation updateUserMood($email: String!, $newMood: MoodInput!) {
        updateUserMood(currentUser: { email: $email, newMood: $newMood })
    }
`;

const MyMood: FC = () => {
    const { user, refetch } = useContext(AuthContext);
    const [moodDatas, setMoodDatas] = useState(user?.userMood);
    const [updateMood] = useMutation(UPDATE_USER_MOOD);

    const OnChangeMood = async (mood: string) => {
        setMoodDatas({
            title: mood,
            image: `${mood}.png`,
        });

        await updateMood({
            variables: {
                email: user?.email,
                newMood: {
                    title: mood,
                    image: `${mood}.png`,
                },
            },
        });
        refetch();
    };

    useEffect(() => {
        setMoodDatas(user?.userMood);
    }, [user]);

    if (!user || !moodDatas) {
        <p>Loading</p>;
    }

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
            <p>Change your mood</p>
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
