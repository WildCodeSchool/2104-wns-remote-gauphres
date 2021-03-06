import React, { FC, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';
import { MemberCard, UserMember } from '../../MemberCard/MemberCard';
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

    if (loading) {
        return (
            <SideMenuContainer>
                <SideMenu />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: '70%',
                    }}
                >
                    <CircularProgress />
                </Box>
            </SideMenuContainer>
        );
    }
    return (
        <SideMenuContainer>
            <SideMenu />
            <MemberPage>
                <MemberTitle>All members</MemberTitle>
                <MembersContainer>
                    {otherUsers &&
                        otherUsers.map((oneUser: UserMember) => (
                            <MemberCard key={oneUser._id} user={oneUser} />
                        ))}
                </MembersContainer>
            </MemberPage>
        </SideMenuContainer>
    );
};

export default MembersPage;
