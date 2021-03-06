import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoginScreen from "./screens/LoginScreen";
import Constants from 'expo-constants';
import { 
  useFonts as UseNunito, Nunito_400Regular,
} from '@expo-google-fonts/nunito';
import { UserProvider } from "./contexts/UserContext";

const { manifest } = Constants;


// const uriClient = `http://${manifest?.debuggerHost
//   ?.split(`:`)
//   ?.shift()
//   ?.concat(`:5000`)}`; 

// // Initialize Apollo Client
// const IP = '10.33.33.181'
// const uri = `http://${IP}:5000/graphql`;

// uriClient = `https://staging`


const client = new ApolloClient({
  uri: 'https://staging.les-gauphres.wns.wilders.dev/graphql',
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
      <UserProvider>
        <LoginScreen />
      </UserProvider>
    </ApolloProvider>
  );
}
