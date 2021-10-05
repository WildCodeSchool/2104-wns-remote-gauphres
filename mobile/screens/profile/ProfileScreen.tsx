import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ProfileModal from "../../components/ProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/UserContext";

const ProfileScreen = ({ navigation }: any) => {
  const { user } = useContext(UserContext);
  
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
        <TouchableOpacity
          style={styles.openCameraButton}
          onPress={() =>  navigation.navigate('CameraScreen')}
        >
          <Text style={styles.buttonText}>Modifier mon avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <View style={styles.infosContainer}>
          <Text style={styles.textInfo}>{user?.username}</Text>
          <Text style={styles.textInfo}>{user?.email}</Text>
        </View>
        <ProfileModal user={user} />
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={() =>  handleDisconnect()}
        >
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    height: "48%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30,
  },
  infosContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInfo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  openCameraButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#6E56EC",
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  disconnectButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF3A1F",
    width: "50%",
  }
});
export default ProfileScreen;
