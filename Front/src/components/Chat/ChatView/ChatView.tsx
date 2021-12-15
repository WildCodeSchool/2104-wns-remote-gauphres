import React, { FC, useEffect, useRef } from 'react';
import { User } from '../../../types/authContextTypes';
import { Container, BubbleMessage } from './style';

export type Message = {
    id: number;
    text: string;
    author: string;
    createdAt: string;
};

type ChatViewProps = {
    messages: Message[] | [];
    user: User | null;
};

export const ChatView: FC<ChatViewProps> = ({
    messages,
    user,
}: ChatViewProps) => {
    const messageEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messageEl.current) {
            messageEl.current.addEventListener(
                'DOMNodeInserted',
                (event: any) => {
                    const { currentTarget: target } = event;
                    if (target) {
                        target.scroll({
                            top: target.scrollHeight,
                            behavior: 'smooth',
                        });
                    }
                }
            );
        }
    }, []);

    return (
        <>
            <Container ref={messageEl}>
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
