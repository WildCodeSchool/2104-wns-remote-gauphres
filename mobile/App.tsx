import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoginScreen from "./screens/LoginScreen";
import Constants from 'expo-constants';
import { 
  useFonts as UseNunito, Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const { manifest } = Constants;

const uriClient = `http://${manifest?.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:5000`)}`; 

// Initialize Apollo Client
const IP = '10.33.33.181'
const uri = `http://${IP}:5000/graphql`;

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

// Routing for the camera components
const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <ProfileStack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown:false}}/>
      <ProfileStack.Screen name="ShowPicture" component={ShowPicture} options={{headerShown:false}} />
    </ProfileStack.Navigator>
  );
}
