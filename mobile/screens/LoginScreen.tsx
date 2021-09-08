import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";
import NotifScreen from "./NotifScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileScreen from "./profile/ProfileScreen";
import CameraScreen from "./profile/CameraScreen";
import ShowPicture from "./profile/ShowPicture";

const Tab = createBottomTabNavigator();

const LOGIN_USER = gql`
    mutation Login($user: UserLoginInput!) {
        Login(currentUser: $user)
    }
`;

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

export default function LoginScreen({navigation}: any) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useMutation(LOGIN_USER);
    const [token, setToken] = useState('');
    const [tokenBack, setTokenBack] = useState('');

    const storeData = async (value: string) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.error(e);
        }
    };
    console.log(token);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if(value !== null) {
                setTokenBack(value);
                console.log('retour:', value);
            }
        } catch(e) {
            console.error(e);
        }
    }
    console.log(tokenBack);

    getData();
    if (tokenBack) {
        return (
            <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === "Notifications") {
                      iconName = focused ? "notifications" : "notifications-outline";
                    } else if (route.name === "Home") {
                      iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "ProfileStack") {
                      iconName = focused ? "person" : "person-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: "#6E56EC",
                  tabBarInactiveTintColor: "gray",
                })}
              >
                <Tab.Screen name="ProfileStack" component={ProfileStackScreen} />
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Notifications" component={NotifScreen} />
            </Tab.Navigator>
            </NavigationContainer>
        );
    };
    
    return (
     <> 
        <View style={styles.titlesContainer}>
          <Text style={styles.mainTitle}>!Moowdy</Text>
          <Text style={styles.secondaryTitle}>Connecte-toi</Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder='Mot de passe'
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={async () => {
                console.log(email);        
                console.log(password);        

                const result = await loginUser({
                    variables: {
                        user: {
                            email,
                            password
                        }
                    }
                });
                if (result.data.Login) {
                    setToken(result.data.Login);
                    storeData(result.data.Login);
                    navigation.navigate("Home");
                }
            }}
            >
            <Text style={styles.textBtn}>Connexion</Text>
          </TouchableOpacity>   
        </View>
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