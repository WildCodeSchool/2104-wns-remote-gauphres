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
                _id
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
    // eslint-disable-next-line no-underscore-dangle
    const testFirstChatRoomId = chatRooms.getAllChatRooms[0]._id;
    console.log(testFirstChatRoomId);

    const { loading, error: queryError, data } = useQuery(FIND_CHAT, {
        variables: { id: testFirstChatRoomId },
    });

    const [chatRoomData, setChatRoomData] = useState<ChatRoomType>();
    useEffect(() => {
        setChatRoomData(data && data.getOneChatRoom);
    }, [data]);

    return (
        <SideMenuContainer>
            <SideMenu />
            <ChatPage>
                <ChatView
                    user={user}
                    messages={chatRoomData && chatRoomData.messages}
                />
                <ChatForm chatId="111" />
            </ChatPage>
            <MemberCard />
        </SideMenuContainer>
    );
};

export default RandomChat;
