import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";


const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
   <> 
    <ApolloProvider client={client}>
      <View style={styles.titlesContainer}>
        <Text style={styles.mainTitle}>!Moowdy</Text>
        <Text style={styles.secondaryTitle}>Connecte-toi</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder='Email'
        />
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder='Mot de passe'
        />
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => console.log('Je me connecte')}
        >
          <Text style={styles.textBtn}>Connexion</Text>
        </TouchableOpacity>   
      </View>
    </ApolloProvider>
  </>
  );
}

const styles = StyleSheet.create({
  titlesContainer: {
    marginTop: '35%',
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgray'
  },
  mainTitle: {
    color: '#6e56ec',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 60
  },
  secondaryTitle: {
    color: '#6e56ec',
    fontSize: 25,
  },
  loginButton: {
    color: 'white',
    alignItems: "center",
    backgroundColor: "#6e56ec",
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '10%',
    padding: 10,
    borderRadius: 3
  },
  textBtn: {
    color: "white"
  }
});