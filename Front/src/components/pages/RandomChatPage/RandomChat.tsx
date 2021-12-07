import React, { FC, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ChatView } from '../../Chat/ChatView/ChatView';
import ChatForm from '../../Chat/ChatForm/ChatForm';
import { UserContext } from '../../../contexts/UserContext';
import { ChatPage } from './style';
import { MemberCard } from '../../Chat/MemberCard/MemberCard';
import SideMenu from '../../SideMenu/SideMenu';
import { SideMenuContainer } from '../../../style';

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
    const { user } = useContext(UserContext);

    if (!user) {
        throw new Error('invalid user');
    }

    const { loading, error, data, subscribeToMore } = useQuery(FIND_CHAT, {
        variables: { id: user.chatrooms },
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
                (oneUser: ChatRoomUser) => oneUser.id !== user._id
            );
        }
    }

    // console.log(GetOtherUser(otherUser.id));
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
};

export default RandomChat;
