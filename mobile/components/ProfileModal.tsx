import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Button, Pressable, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";

type ProfilModalProps = {
  user: User
}

type User = {
    username: string;
    email: string;
    password: string;
}

type FormData = {
  username: string;
  email: string;
  password: string;
};

const ProfileModal = ({ user }: ProfilModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    await console.log(data); // TODO submit mutation to update user
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
                name="password"
                defaultValue={user ? user.password : ""}

              />
              {errors.password && <Text>Le mot de passe est requis</Text>}         
            </View>
            <Pressable
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.openModalButtonText}>Enregistrer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openModalButtonText}>Modifier mes infos</Text>
      </Pressable>
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
    height: 350,
    margin: 20,
    backgroundColor: "#FAC748",
    borderRadius: 20,
    padding: 35,
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
  openModalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default ProfileModal;