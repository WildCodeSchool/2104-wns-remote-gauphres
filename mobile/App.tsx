import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoginScreen from "./screens/LoginScreen";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.24:5000/graphql',
  cache: new InMemoryCache()
});

export default function App() {

    return (
      <ApolloProvider client={client}>
        <LoginScreen /> 
      </ApolloProvider>
    );
}