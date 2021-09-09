import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { User } from '../contexts/UserContext';
import { gql, useMutation } from '@apollo/client';

type ProfilModalProps = {
  user: User | undefined
}

type FormData = {
  username: string;
  email: string;
  password: string;
};

const UPDATE_USER = gql`
  mutation updateUser($email: UserEmail!, $user: UserInput!) {
    updateUser(
      currentEmail: $email
      currentUser: $user,
    ) {username}
  }
`

const ProfileModal = ({ user }: ProfilModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [updateUser] = useMutation(UPDATE_USER);

  const onSubmit = async ({ email, username}: any) => {
    await updateUser({
      variables: {
        user: {
          email,
          username
        },
        email: {
          email: user?.email,
        }
      }
    });
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButtonView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputsView}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="username"
                defaultValue={user ? user.username : ""}

              />
              {errors.username && <Text>Le pseudo est requis</Text>}

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                defaultValue={user ? user.email : ""}
              />
              {errors.email && <Text>L'email est requis</Text>}
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Modifier mes infos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  closeButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#6E56EC",
    height: 35,
    width: 35,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 300,
    height: 400,
    margin: 20,
    backgroundColor: "#FAC748",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputsView: {
    width: "100%",
    height: "85%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textInput: { 
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 10,
    width: "100%"
  },
  saveButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#6E56EC",
    width: "100%",
  },
  openModalButton: {
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
});

export default ProfileModal;