import React, {useEffect, useState} from "react";
import { Button, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system';

const ShowPicture = ({navigation}:any) => {
    const [imagesURI, setImagesURI] = useState<string[]> ([]);
    useEffect(() => {
        (async () => {
          const images = await FileSystem.readDirectoryAsync(
            FileSystem.cacheDirectory + "ImageManipulator"
          );
          setImagesURI(images);
        })();
      }, []);      

    return imagesURI.length > 0 ? (
        <><Image
        style={{
          flex: 1,
          resizeMode: "cover",
          height: 500,
        }}
        source={{
          uri: FileSystem.cacheDirectory + "ImageManipulator/" + imagesURI[0],
        }} />
        <View>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={async () => {
            await FileSystem.deleteAsync(FileSystem.cacheDirectory + "ImageManipulator"); // clean cache and go back to CameraScreen
            navigation.navigate('CameraScreen');
          }}>
            <Image style={styles.backButton} source={require('/home/benoit/Documents/Dev++/Moowdy/2104-wns-remote-gauphres/mobile/assets/noValidateButton.png')} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.validateButton}
            onPress={async () => {
            await FileSystem.deleteAsync(FileSystem.cacheDirectory + "ImageManipulator"); // upload photo
            navigation.navigate('CameraScreen'); // go to profil page
          }}>
            <Image style={styles.validateButton} source={require('/home/benoit/Documents/Dev++/Moowdy/2104-wns-remote-gauphres/mobile/assets/validateButton.png')} />
          </TouchableOpacity>
        </View></>
  ) : null;
};

export default ShowPicture;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 15,
    height:80,
    width:80,
  },
  validateButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    height:80,
    width:80,
  },
});