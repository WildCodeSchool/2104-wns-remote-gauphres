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

const FIND_ALL_CHAT = gql`
    query getAllChatRooms {
        getAllChatRooms {
            _id
            title
        }
    }
`;

const SUBSCRIPTION_MESSAGE = gql`
    subscription {
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
    messages: Message[] | undefined;
    users: User[];
    title: string;
};

const RandomChat: FC = () => {
    const { user } = useContext(UserContext);

    // for test, chatroom id
    const { data: chatRooms } = useQuery(FIND_ALL_CHAT);
    //àremplacer par chatroom via user en décembre 
    const testFirstChatRoomId = chatRooms?.getAllChatRooms[0]?._id;
    const { loading, error: queryError, data, subscribeToMore } = useQuery(
        FIND_CHAT,
        {
            variables: { id: testFirstChatRoomId },
        }
    );

    const [chatRoomData, setChatRoomData] = useState<ChatRoomType>();
    useEffect(() => {
        setChatRoomData(data && data.getOneChatRoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIPTION_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.messageSent;

                return {
                    getOneChatRoom: [...prev.getOneChatRoom, newMessage],
                };
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('chatRoomData:', chatRoomData);
    // TODO : AJOUTER CONTEXTE pour username

    return (
        <SideMenuContainer>
            <SideMenu />
            <ChatPage>
                <ChatView
                    user={user}
                    messages={chatRoomData && chatRoomData.messages}
                />
                <ChatForm chatId={testFirstChatRoomId} username="user" />
            </ChatPage>
            <MemberCard />
        </SideMenuContainer>
    );
};

export default RandomChat;
