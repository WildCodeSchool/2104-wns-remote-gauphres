import React, { FC, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';
import {
    ProfilContainer,
    ProfileTitle,
    ProfileCard,
    MyAvatar,
    MiniAvatar,
    Avatars,
} from './style';
import { AuthContext } from '../../../contexts/AuthContext';

const UPDATE_USER_PICTURE = gql`
    mutation updateUserPicture($email: String!, $picture: String!) {
        updateUserPicture(currentUser: { email: $email, picture: $picture })
    }
`;

const ProfilePage: FC = () => {
    const { user, refetch } = useContext(AuthContext);
    const [updateUserPicture] = useMutation(UPDATE_USER_PICTURE);

    const OnChangePicture = async (picture: string) => {
        await updateUserPicture({
            variables: {
                email: user?.email,
                picture: `${picture}.png`,
            },
        });
        refetch();
    };

    if (!user || !user.avatar) {
        <p>Loading</p>;
    }
    return (
        <SideMenuContainer>
            <SideMenu />
            <ProfilContainer>
                <ProfileTitle>Your profile</ProfileTitle>
                <MyAvatar
                    src={`/images/avatars/${
                        user && user.avatar !== null
                            ? user.avatar
                            : 'default.png'
                    }`}
                    alt={user?.avatar}
                />
                <ProfileCard>Change your avatar</ProfileCard>
                <Avatars>
                    <MiniAvatar
                        src="/images/avatars/boy.png"
                        alt="boy"
                        onClick={() => OnChangePicture('boy')}
                    />
                    <MiniAvatar
                        src="/images/avatars/girl.png"
                        alt="girl"
                        onClick={() => OnChangePicture('girl')}
                    />
                    <MiniAvatar
                        src="/images/avatars/gauffre.png"
                        alt="gauffre"
                        onClick={() => OnChangePicture('gauffre')}
                    />
                    <MiniAvatar
                        src="/images/avatars/default.png"
                        alt="default"
                        onClick={() => OnChangePicture('default')}
                    />
                </Avatars>
            </ProfilContainer>
        </SideMenuContainer>
    );
};

export default ProfilePage;
