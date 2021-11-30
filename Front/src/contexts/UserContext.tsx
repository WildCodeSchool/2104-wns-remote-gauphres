import { gql, useMutation, useQuery } from '@apollo/client';
import React, { createContext, useState, Dispatch, useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';

export type UserMood = {
    title: string;
    image: string;
};

export type User = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar: string;
    isConnected: boolean;
    email: string;
    birthDate: string;
    userMood?: UserMood;
    hobbies: string[];
    chatrooms: string;
    city: string;
} | null;

type UserCredentials = {
    email: string;
    password: string;
};

export const UserContext = createContext<{
    user: User;
    login: (userCredentials: UserCredentials) => void;
}>({ user: null, login: () => {} });

const LOGIN_USER = gql`
    mutation Login($user: UserLoginInput!) {
        Login(currentUser: $user) {
            token
            user {
                _id
                username
                firstname
                lastname
                avatar
                city
                isConnected
                email
                birthDate
                # userMood {
                #     title
                #     image
                # }
                hobbies
                chatrooms
            }
        }
    }
`;

export const UserProvider: FC = ({ children }) => {
    const history = useHistory();
    const [loginUser, { data }] = useMutation(LOGIN_USER);
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        if (data?.Login) {
            try {
                setUser(data.Login.user);
                localStorage.setItem('@storage_Key', data.Login.token);
                history.push('/dashboard');
            } catch (err) {
                console.log(err);
            }
        }
    }, [data, history]);

    const login = (userCredentials: UserCredentials) => {
        try {
            loginUser({ variables: { user: userCredentials } });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};
