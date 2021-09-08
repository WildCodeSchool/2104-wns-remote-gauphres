import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import ProfileModal from "../../components/ProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }: any) => {

  // TODO Get user infos
  const user = {
    username: 'John',
    email: 'john.doe@gmail.com',
    password: '1234',
  }

  const handleDisconnect = async () => {
    await AsyncStorage.clear()
    navigation.navigate("LoginPage");
  }

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={{ backgroundColor: "#6E56EC", height: 140, width: 140, borderRadius: 100, justifyContent: "center", alignItems: "center"}}>
          <Text style={{ color: "#fff"}}>Avatar</Text>
        </View>
        <Pressable
          style={styles.openCameraButton}
          onPress={() =>  navigation.navigate('CameraScreen')}
        >
          <Text style={styles.openCameraButtonText}>Modifier mon avatar</Text>
        </Pressable>
        <Pressable
          style={styles.openCameraButton}
          onPress={ handleDisconnect }
        >
          <Text style={styles.openCameraButtonText}>Deconnexion</Text>
        </Pressable>
      </View>
      <View style={styles.centeredView}>
        <View style={styles.infosContainer}>
          <Text style={styles.textInfo}>{user.username}</Text>
          <Text style={styles.textInfo}>{user.email}</Text>
        </View>
        <ProfileModal user={user} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    height: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infosContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInfo: {
    
  },
  openCameraButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#6E56EC",
    width: "50%",
  },
  openCameraButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
export default ProfileScreen;
