import React, {useEffect, useState} from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system';
import { gql, useMutation } from '@apollo/client';
import { useRoute } from "@react-navigation/native";


const UPDATE_PICTURE = gql`
  mutation updateUserPicture($picture: UserPictureInput) {
    updateUserPicture(updatedPicture: $picture)
  }
`

const ShowPicture = ({navigation}: any) => {
  const route = useRoute();
  const {screen, ...pictureUri}: any = route.params;
  // const navigation = useNavigation();
    const [imagesURI, setImagesURI] = useState<string[]> ([]);
    const [updatedPicture] = useMutation(UPDATE_PICTURE);
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
              console.log(pictureUri);
              await updatedPicture({
                variables: {
                  user: {
                    avatar: pictureUri.uri,
                  },
                },
              })              
              navigation.navigate('ProfileScreen');
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