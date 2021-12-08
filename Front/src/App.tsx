import React, { FC } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import {
    ApolloClient,
    ApolloProvider,
    NormalizedCacheObject,
} from '@apollo/client';

import RandomChat from './components/pages/RandomChatPage/RandomChat';
import './App.css';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ArticlesPage from './components/pages/Articles/Article';
import EventsPage from './components/pages/Events/Events';
import MembersPage from './components/pages/Members/Members';
import LoginPage from './components/pages/Login/Login';
import HomePage from './components/pages/HomePage/HomePage';
import SignUpPage from './components/pages/SignUp/SignUp';
import { AuthProvider } from './contexts/AuthContext';

type PrivateRouteProps = {
    children: React.ReactNode;
    path: string;
};

const App: FC<{ client: ApolloClient<NormalizedCacheObject> }> = ({
    client,
}) => {
    const PrivateRoute = ({ children, path }: PrivateRouteProps) => {
        const isAuthenticated = localStorage.getItem('jwtToken');
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

    return (
        <Router>
            <ApolloProvider client={client}>
                <AuthProvider>
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
                </AuthProvider>
            </ApolloProvider>
        </Router>
    );
};

export default App;
