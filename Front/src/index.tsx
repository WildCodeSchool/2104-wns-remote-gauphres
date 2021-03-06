import {
    createHttpLink,
    split,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const env = process.env.NODE_ENV;
const subscriptionUrl = process.env.REACT_APP_SUB_URL;

const getGraphqlUri = () => {
    if (env === 'production') return '/graphql';
    return 'http://localhost:5000/graphql';
};

const getSubscriptionsUri = () => {
    if (env === 'production') {
        return `wss://${subscriptionUrl}/subscriptions`;
    }
    return 'ws://localhost:5000/subscriptions';
};

const wsLink = new WebSocketLink({
    uri: getSubscriptionsUri(),
    options: {
        reconnect: true,
    },
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});

const httpLink = createHttpLink({
    uri: getGraphqlUri(),
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <App client={client} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
