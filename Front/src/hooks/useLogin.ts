import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ActionKind } from '../types/authContextTypes';

type FormValues = {
    email: string;
    password: string;
};

type LoginFunction = (userCredentials: FormValues) => Promise<void>;

const LOGIN_USER = gql`
    mutation Login($user: UserLoginInput!) {
        Login(currentUser: $user) {
            user {
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
            token
        }
    }
`;

const useLogin = (): { login: LoginFunction } => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);
    const [loginUser] = useMutation(LOGIN_USER);
    const login: LoginFunction = async (userCredentials) => {
        try {
            const { data } = await loginUser({
                variables: { user: userCredentials },
            });
            if (data && data.Login) {
                localStorage.setItem('jwtToken', data.Login.token);
                dispatch({
                    type: ActionKind.Login,
                    payload: data.Login.user,
                });
                history.push('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    };
    return { login };
};

export default useLogin;
