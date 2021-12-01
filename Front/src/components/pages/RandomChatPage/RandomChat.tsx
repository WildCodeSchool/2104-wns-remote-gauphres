/* eslint-disable no-underscore-dangle */
import React, { FC, useContext, Dispatch, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ChatView, Message } from '../../Chat/ChatView/ChatView';
import ChatForm from '../../Chat/ChatForm/ChatForm';
import { UserContext, User } from '../../../contexts/UserContext';
import { ChatPage } from './style';
import MemberCard from '../../Chat/MemberCard/MemberCard';
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

type ChatRoomType = {
    createdAt: string;
    isActiv: boolean;
    messages: Message[] | [];
    users: User[];
    title: string;
};

const RandomChat: FC = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        throw new Error('invalid user');
    }

    const { loading, error, data, subscribeToMore } = useQuery(FIND_CHAT, {
        variables: { id: user.chatrooms },
    });

    // useEffect(() => {
    //     setChatRoomData(data && data.getOneChatRoom);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data]);

    useEffect(() => {
        console.log('coucou');
        subscribeToMore({
            document: SUBSCRIPTION_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                console.log('subddata:', subscriptionData);
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.messageSent.message;
                console.log(prev, newMessage);

                return {
                    getOneChatRoom[messages]: [...prev.getOneChatRoom.messages, newMessage],
                };
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeToMore]);

    console.log('data:', data && data.getOneChatRoom);

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
            <MemberCard />
        </SideMenuContainer>
    );
};

export default RandomChat;
