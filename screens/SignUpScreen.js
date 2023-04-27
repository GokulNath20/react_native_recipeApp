import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CheckBox from "react-native-check-box";
import { auth } from "../firebaseConfig";

const windowWidth = Dimensions.get("window").width;

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        ToastAndroid.show("Sign Up Successful", ToastAndroid.SHORT);
        console.log("Sign Up Successful");
        navigation.navigate("Login");
        // ...
      })
      .catch((error) => {
        ToastAndroid.show(
          "Please complete the register form",
          ToastAndroid.SHORT
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 30 }}>
        <Image
          style={styles.logo}
          source={require("../assets/recipe-logo.png")}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isSelected}
          onClick={() => setIsSelected(!isSelected)}
        />
        <Text style={{ fontSize: 15, paddingLeft: 10 }}>
          Accept terms & conditions
        </Text>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.navigateLoginText}>
          Already have an account? <Text style={styles.specialText}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: windowWidth * 0.7,
    height: 110,
    paddingBottom: 100,
  },
  inputView: {
    width: "80%",
    backgroundColor: "lightgrey",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  checkboxContainer: {
    marginLeft: 45,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  navigateLoginText: {
    color: "black",
    fontWeight: "bold",
  },
  specialText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
