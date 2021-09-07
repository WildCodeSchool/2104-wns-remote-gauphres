import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoginScreen from "./screens/LoginScreen";
import Constants from 'expo-constants';
import { 
  useFonts as UseNunito, Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const { manifest } = Constants;

const uriClient = `http://${manifest.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:5000`)}`;

// Initialize Apollo Client
const client = new ApolloClient({
  uri: uriClient,
  cache: new InMemoryCache()
});

export default function App() {
    const [nunitoLoaded] = UseNunito({
        Nunito_400Regular,
    });

    if (!nunitoLoaded) {
        return null ;
    }

  return (
    <ApolloProvider client={client}>
      <LoginScreen /> 
    </ApolloProvider>
  );
}
