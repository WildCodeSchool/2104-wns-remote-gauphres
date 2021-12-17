import { gql, useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { Container, Form, FormInput, FormButton } from './style';

const CREATE_MESSAGE = gql`
    mutation sendMessage($id: String!, $newMessage: CreateMessageInput!) {
        sendMessage(id: $id, newMessage: $newMessage)
    }
`;

type ChatFormProps = {
    chatId: string;
    username: string;
};

const isMessageValid = (message: string): boolean => {
    if (!message || message.trim() === '') {
        return false;
    }
    return true;
};

const ChatForm: FC<ChatFormProps> = ({ chatId, username }: ChatFormProps) => {
    const [message, setMessage] = useState('');
    const [createMessage] = useMutation(CREATE_MESSAGE);

    return (
        <Container>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (isMessageValid(message)) {
                        createMessage({
                            variables: {
                                id: chatId,
                                newMessage: {
                                    author: username,
                                    text: message,
                                },
                            },
                        });
                        setMessage('');
                    } else {
                        // TODO change this to a real error message
                        alert('You cannot send empty message');
                    }
                }}
            >
                <FormInput
                    autoComplete="off"
                    type="text"
                    name="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <FormButton type="submit">Send</FormButton>
            </Form>
        </Container>
    );
};

export default ChatForm;
