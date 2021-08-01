import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";
import firebase from "firebase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        var user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL
              ? imageURL
              : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190223%2Fourmid%2Fpngtree-vector-avatar-icon-png-image_695765.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Favatar&tbnid=2FZlRrWlFjEfhM&vet=12ahUKEwjthOqmicHwAhV40XMBHeU_AccQMygHegUIARDjAQ..i&docid=UUPtDBJdc_Dc4M&w=360&h=360&q=avatar%20jpg&ved=2ahUKEwjthOqmicHwAhV40XMBHeU_AccQMygHegUIARDjAQ",
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });
        // ...
        navigation.popToTop();
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="enter name"
        label="name"
        leftIcon={{ type: "material", name: "badge" }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="enter email"
        label="email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="enter password"
        label="password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder="enter image url"
        label="profile picture"
        leftIcon={{ type: "material", name: "face" }}
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      />

      <Button title="register" onPress={register} style={styles.button} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
