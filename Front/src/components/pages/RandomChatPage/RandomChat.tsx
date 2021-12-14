import React, { FC, useContext, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ChatView } from '../../Chat/ChatView/ChatView';
import ChatForm from '../../Chat/ChatForm/ChatForm';
import { AuthContext } from '../../../contexts/AuthContext';
import { ChatPage } from './style';
import { MemberCard } from '../../Chat/MemberCard/MemberCard';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';
import Button from '../../Button/Button';

const CREATE_CHATROOM = gql`
    mutation createChatRoom($data: CreateChatRoomInput!) {
        createChatRoom(newChatRoom: $data) {
            _id
            title
            chatRoomUsers {
                username
            }
        }
    }
`;

const FIND_RANDOM_USER = gql`
    query findUserForRandomChatRoom {
        findUserForRandomChatRoom {
            _id
            username
        }
    }
`;

const FIND_CHAT = gql`
    query GetOneChatRoom($id: String!) {
        getOneChatRoom(id: $id) {
            _id
            title
            chatRoomUsers {
                id
                username
                isConnected
                avatar
                hobbies
            }
            messages {
                id
                text
                author
                createdAt
            }
            createdAt
        }
    }
`;

const SUBSCRIPTION_USERSTATUS = gql`
    subscription onUserStatusChanged {
        userStatusChanged {
            userId
            newStatus
        }
    }
`;

const SUBSCRIPTION_MESSAGE = gql`
    subscription onMessageSent {
        messageSent {
            message {
                id
                text
                author
                createdAt
            }
            chatRoomId
        }
    }
`;

const FIND_USER = gql`
    query getUserById($id: String!) {
        getUserById(_id: $id) {
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

type ChatRoomUser = {
    id: string;
    username: string;
    isConnected: boolean;
    avatar: string;
    hobbies: string[];
};

const GetOtherUser = (id: string) => {
    const { loading, data: otherUserData } = useQuery(FIND_USER, {
        variables: { id },
    });
    if (!id) return null;
    if (!loading && otherUserData) {
        const { getUserById: user } = otherUserData;
        return user;
    }
    return null;
};

const RandomChat: FC = () => {
    const { user, refetch } = useContext(AuthContext);
    const [createChatRoom] = useMutation(CREATE_CHATROOM);
    const { data: randomUserForChatRoom } = useQuery(FIND_RANDOM_USER);

    const { loading, error, data, subscribeToMore } = useQuery(FIND_CHAT, {
        variables: { id: user?.chatrooms },
    });

    let otherUser: ChatRoomUser = {
        id: '',
        username: '',
        isConnected: false,
        avatar: '',
        hobbies: [],
    };

    if (!loading && data) {
        if (data.getOneChatRoom.chatRoomUsers.length > 0) {
            otherUser = data.getOneChatRoom.chatRoomUsers.find(
                (oneUser: ChatRoomUser) => oneUser.id !== user?._id
            );
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const joinChatRoom = async (
        currentUsernameData: string | undefined,
        randomUsernameData: string
    ) => {
        if (currentUsernameData !== randomUsernameData) {
            await createChatRoom({
                variables: {
                    data: {
                        title: `Chatroom de ${currentUsernameData} et ${randomUsernameData}`,
                        chatRoomUsers: [
                            {
                                username: currentUsernameData,
                            },
                            {
                                username: randomUsernameData,
                            },
                        ],
                        messages: [],
                    },
                },
            });
        } else {
            alert(
                "Aucun utilisateur n'est actuellement disponible pour échanger. Veuillez ré-essayer plus tard ;)"
            );
        }
        refetch();
    };

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIPTION_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.messageSent.message;
                return {
                    getOneChatRoom: {
                        ...prev.getOneChatRoom,
                        messages: [...prev.getOneChatRoom.messages, newMessage],
                    },
                };
            },
        });
    }, [subscribeToMore]);

    const checkOtherUser = GetOtherUser(otherUser.id);

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
    if (user?.chatrooms != null) {
        return (
            <SideMenuContainer>
                <SideMenu />
                <ChatPage>
                    <ChatView
                        user={user}
                        messages={data ? data.getOneChatRoom.messages : []}
                    />
                    {user && (
                        <ChatForm
                            chatId={user.chatrooms}
                            username={user.username}
                        />
                    )}
                </ChatPage>
                {checkOtherUser && <MemberCard user={checkOtherUser} />}
            </SideMenuContainer>
        );
    }

    return (
        <SideMenuContainer>
            <SideMenu />
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70%',
                }}
            >
                <Button
                    color="primary"
                    onClick={() =>
                        joinChatRoom(
                            user?.username,
                            randomUserForChatRoom.findUserForRandomChatRoom
                                .username
                        )
                    }
                >
                    Rejoindre une chatroom
                </Button>
            </span>
        </SideMenuContainer>
    );
};

export default RandomChat;
