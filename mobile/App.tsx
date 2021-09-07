import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

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