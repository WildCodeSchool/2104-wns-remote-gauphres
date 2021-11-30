import React, { FC } from 'react';
import { gql } from '@apollo/client';
import { Container, BubbleMessage } from './style';
import { User } from '../../../contexts/UserContext';

export type Message = {
    id: number;
    text: string;
    author: string;
    createdAt: string;
};

type ChatViewProps = {
    messages: Message[] | undefined;
    user: User | null | undefined;
};

export const ChatView: FC<ChatViewProps> = ({
    messages,
    user,
}: ChatViewProps) => {
    return (
        <>
            <Container>
                {messages &&
                    messages.map((message) => {
                        const isMe = message.author === user?.username;
                        return (
                            <BubbleMessage isMe={isMe}>
                                {message.text}
                            </BubbleMessage>
                        );
                    })}
            </Container>
        </>
    );
};
