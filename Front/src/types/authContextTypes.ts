export interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    avatar: string;
    isConnected: boolean;
    email: string;
    birthDate: string;
    hobbies: string[];
    chatrooms: string;
    city: string;
    userMood?: {
        title: string;
        image: string;
    };
}

export interface InitialState {
    user: null;
}

export enum ActionKind {
    Login = 'LOGIN',
    Logout = 'LOGOUT',
}

export interface Action {
    type: ActionKind;
    payload: User;
}

export interface State {
    user: User | null;
}
