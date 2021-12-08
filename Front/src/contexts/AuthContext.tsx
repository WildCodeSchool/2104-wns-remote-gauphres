import React, { useReducer, createContext, useEffect, FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Action,
    ActionKind,
    InitialState,
    State,
    User,
} from '../types/authContextTypes';
import getUserEmailByToken from '../utils/getUserEmailByToken';

const FIND_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            _id
            username
            firstname
            lastname
            avatar
            isConnected
            email
            birthDate
            hobbies
            chatrooms
            userMood {
                title
                image
            }
        }
    }
`;

export const AuthContext = createContext<{
    user: User | null;
    dispatch: React.Dispatch<Action>;
    refetch: () => void;
}>({
    user: null,
    dispatch: () => null,
    refetch: () => null,
});

const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider: FC = ({ children }) => {
    const initialState: InitialState = { user: null };
    const token = localStorage.getItem('jwtToken');
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { data, refetch } = useQuery(FIND_USER_BY_EMAIL, {
        variables: { email: getUserEmailByToken(token) },
    });

    useEffect(() => {
        if (data && data.getUserByEmail)
            dispatch({
                type: ActionKind.Login,
                payload: data.getUserByEmail,
            });
    }, [data]);

    return (
        <AuthContext.Provider value={{ user: state.user, dispatch, refetch }}>
            {children}
        </AuthContext.Provider>
    );
};
