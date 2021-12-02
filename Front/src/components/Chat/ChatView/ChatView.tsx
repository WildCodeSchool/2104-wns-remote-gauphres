import React, { FC } from 'react';
import { Container, BubbleMessage } from './style';
import { User } from '../../../contexts/UserContext';

export type Message = {
    id: number;
    text: string;
    author: string;
    createdAt: string;
};

type ChatViewProps = {
    messages: Message[] | [];
    user: User;
};

export const ChatView: FC<ChatViewProps> = ({
    messages,
    user,
}: ChatViewProps) => {
    return (
        <>
            <Container>
                {messages.length > 0 &&
                    user !== null &&
                    messages.map((message) => {
                        const isMe = message.author === user.username;
                        return (
                            <BubbleMessage isMe={isMe} key={message.id}>
                                {message.text}
                            </BubbleMessage>
                        );
                    })}
            </Container>
        </>
    );
};
