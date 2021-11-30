import React, { FC } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    split,
    HttpLink,
    createHttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import RandomChat from './components/pages/RandomChatPage/RandomChat';
import './App.css';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ArticlesPage from './components/pages/Articles/Article';
import EventsPage from './components/pages/Events/Events';
import MembersPage from './components/pages/Members/Members';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './components/pages/Login/Login';
import HomePage from './components/pages/HomePage/HomePage';
import SignUpPage from './components/pages/SignUp/SignUp';

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:5000/subscriptions',
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
});

// à rajouter l.68 dans le client en décembre 21
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const env = process.env.NODE_ENV;

const getUri = () => {
    if (env === 'production') return '/graphql';
    return 'http://localhost:5000/graphql';
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('@storage_Key');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(createHttpLink({ uri: getUri() })),
    uri: getUri(),
    cache: new InMemoryCache(),
});

type PrivateRouteProps = {
    children: React.ReactNode;
    path: string;
};

const PrivateRoute = ({ children, path }: PrivateRouteProps) => {
    const isAuthenticated = localStorage.getItem('@storage_Key');
    return (
        <Route
            path={path}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const App: FC = () => {
    return (
        <Router>
            <ApolloProvider client={client}>
                <UserProvider>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={SignUpPage} />
                        <PrivateRoute path="/dashboard">
                            <Dashboard />
                        </PrivateRoute>
                        <PrivateRoute path="/articles">
                            <ArticlesPage />
                        </PrivateRoute>
                        <PrivateRoute path="/random-chat">
                            <RandomChat />
                        </PrivateRoute>
                        <PrivateRoute path="/members">
                            <MembersPage />
                        </PrivateRoute>
                        <PrivateRoute path="/events">
                            <EventsPage />
                        </PrivateRoute>
                    </Switch>
                </UserProvider>
            </ApolloProvider>
        </Router>
    );
};

export default App;
