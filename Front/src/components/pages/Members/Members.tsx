import { Link } from 'react-router-dom';
import React, { FC, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';
import { MemberCard, UserMember } from '../../Chat/MemberCard/MemberCard';
import { MemberPage, MembersContainer, MemberTitle } from './style';
import { AuthContext } from '../../../contexts/AuthContext';
import { User } from '../../../types/authContextTypes';

const FIND_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            _id
            username
            firstname
            lastname
            avatar
            isConnected
            birthDate
            userMood {
                title
                image
            }
            hobbies
        }
    }
`;

const MembersPage: FC = () => {
    const { user } = useContext(AuthContext);

    const { loading, data: getAllUsers } = useQuery(FIND_ALL_USERS);

    let otherUsers;

    if (!loading && getAllUsers) {
        if (getAllUsers.getAllUsers.length > 0 && user) {
            otherUsers = getAllUsers.getAllUsers.filter((oneUser: User) =>
                oneUser ? oneUser._id !== user._id : ''
            );
        }
    }

    return (
        <SideMenuContainer>
            <SideMenu />
            <MemberPage>
                <MemberTitle>Tous les autres membres</MemberTitle>
                <MembersContainer>
                    {otherUsers &&
                        otherUsers.map((oneUser: UserMember) => (
                            <MemberCard user={oneUser} />
                        ))}
                </MembersContainer>
            </MemberPage>
        </SideMenuContainer>
    );
};

export default MembersPage;
