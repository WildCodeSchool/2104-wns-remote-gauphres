import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,  
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const NotifScreen = () => {
    let [fontsLoaded] = useFonts({
    Nunito_400Regular
  });


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}> Notifications</Text>

                <View style={styles.notifBlock}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.blockCount}>3</Text>                  
                        <Ionicons name="people-outline" color="#6E56EC" size={30}/>
                    </View>
                    <Text style={styles.blockTitle}>autres personnes en ligne</Text>  
                </View>
                <View style={styles.notifBlock}>
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Text style={styles.blockCount} >2</Text>
                        <Ionicons name="chatbubble-ellipses-outline" color="#6E56EC" size={30}/>
                    </View>
                    <Text style={styles.blockTitle}>messages non lus</Text>
                </View>
            </View>
        </>
  );
};
export default NotifScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#EDF2F7"},
    title: {  marginTop: 3, fontSize: 25, lineHeight: 50, fontWeight:"bold", color: "#6E56EC", textTransform: "uppercase", marginLeft: 10},
    notifBlock: {flex:2, backgroundColor: "white", margin:20, borderRadius:10, shadowRadius: 0.1, shadowOpacity: 0.1, alignItems: "center", justifyContent:"center"},
    blockTitle: { fontFamily: 'Nunito_400Regular', marginTop: 10, fontSize: 15, fontWeight:"400", marginHorizontal:20, textAlign:"center"},
    blockCount: {fontSize: 35, lineHeight: 35, marginRight: 5, fontWeight:"bold", color: "#6E56EC", textAlign:"center"},

})