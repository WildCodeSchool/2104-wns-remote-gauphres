import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import NotifScreen from "./screens/NotifScreen";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Images" component={HomeScreen} />
        <Tab.Screen name="Feed" component={NotifScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </ApolloProvider>
  );
}
