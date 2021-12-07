import React, { FC, useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { User, UserContext } from '../../../contexts/UserContext';
import { SmallCard, MoodImage, MiniImages, MiniImage } from '../moodStyle';
// import { MoodInput } from '../../../../../Back/src/models/Mood';

// const UPDATE_USER_MOOD = gql`
//     mutation updateUserMood {
//         updateUserMood(
//             currentUser: {
//                 email: user.email,
//                 newMood : moodDatas
//             }
//         )
//     }
// `;

type MoodProps = {
    user: User | undefined | null;
};

const MyMood: FC<MoodProps> = ({ user }: MoodProps) => {
    const { user: userFromContext } = useContext(UserContext);
    const [moodDatas, setMoodDatas] = useState(userFromContext?.userMood);

    const OnChangeMood = (mood: string) => {
        setMoodDatas({
            title: mood,
            image: `${mood}.png`,
        });
        console.log('moodDatas', moodDatas);
        // const [updateMood] = useMutation(UPDATE_USER_MOOD);
    };

    return (
        <SmallCard>
            <p data-testid="myMood-title">Ton mood</p>
            <MoodImage
                id="main-mood"
                src={`/images/moods/${
                    moodDatas !== null ? moodDatas?.image : 'default.png'
                }`}
                alt={user?.userMood?.title}
            />
            <p data-testid="myMood-title">Change-le ici</p>
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
