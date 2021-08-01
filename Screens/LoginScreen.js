import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {
    const unsubcribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("chat screen");
      } else {
        navigation.popToTop();
      }
    });
    return unsubcribe;
  }, []);
  return (
    <View style={styles.container}>
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

      <Button title="sign in" style={styles.button} onPress={signIn} />
      <Button
        title="register"
        style={styles.button}
        onPress={() => navigation.navigate("register screen")}
      />
    </View>
  );
};

export default LoginScreen;

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
