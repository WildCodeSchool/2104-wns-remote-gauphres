import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Bienvenue sur \n!Moowdy`}</Text>
            <View style={styles.iconContainer}>
                <Ionicons name="happy" color="#6E56EC" size={75}/>
                <Ionicons name="chatbubbles" size={75}/>
                <Ionicons name="sad" color="#FAC748" size={75}/>
            </View>
        </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#EDF2F7", alignItems: "center", justifyContent:"space-around"},
    title: { flex:1, fontSize: 35, lineHeight: 50, fontWeight:"bold", color: "#6E56EC", marginLeft: 10, textAlign:"center", marginTop:30 },
    iconContainer: { flex:2, marginVertical: 10, marginTop:65 }
    })
