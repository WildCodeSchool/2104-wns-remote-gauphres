import React, { FC, useContext, Dispatch } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ChatView from '../../Chat/ChatView/ChatView';
import ChatForm from '../../Chat/ChatForm/ChatForm';
import { UserContext, User } from '../../../contexts/UserContext';
import { ChatPage } from './style';

// const FIND_CHAT = gql`
//     query getChat($id: ID!) {
//         getChat(id: $id) {
//             title
//             users {
//                 firstName
//             }
//             messages {
//                 text
//                 author
//                 createdAt
//             }
//             createdAt
//             isActive
//         }
//     }
// `;

const RandomChat: FC = () => {
    const user = useContext<[User | undefined, Dispatch<User>] | null>(
        UserContext
    );
    const { id } = useParams<{ id: string }>();
    // const { loading, error: queryError, data } = useQuery(FIND_CHAT, {
    //     variables: { id },
    // });
    // TEMPORARY fake messages initialization
    const messages = [
        {
            text: 'jhtfjhgfjh',
            author: 'toto',
            createdAt: 'jythfgjhgvh',
        },
        {
            text: 'urtkrukyu',
            author: 'toto',
            createdAt: 'truk',
        },
        {
            text: 'trk',
            author: 'titi',
            createdAt: 'rutkyukhj',
        },
    ];
    return (
        <ChatPage>
            <ChatView messages={messages} />
            <ChatForm />
        </ChatPage>
    );
};

export default RandomChat;
