import React, { useState, useEffect } from "react";
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
import CheckBox from "react-native-check-box";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const windowWidth = Dimensions.get("window").width;

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  async storeData() {
    try {
      await AsyncStorage.setItem("@login_email", this.state.email);
      await AsyncStorage.setItem("@login_password", this.state.password);
      ToastAndroid.show("Preference stored", ToastAndroid.SHORT);
      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async retrieveData() {
    try {
      const email = await AsyncStorage.getItem("@login_email");
      const password = await AsyncStorage.getItem("@login_password");
      const rememberMe = await AsyncStorage.getItem("@remember_me");
      if (rememberMe !== null) {
        this.setState({ email, password, rememberMe: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeData() {
    try {
      await AsyncStorage.removeItem("@login_email"); // replace with your key
      await AsyncStorage.removeItem("@login_password"); // replace with your key
      console.log("Data removed successfully");
      ToastAndroid.show("Preference removed", ToastAndroid.SHORT);
    } catch (e) {
      console.log("Error removing data: ", e);
    }
  }

  handleCheckBoxChange = () => {
    this.setState(
      (prevState) => ({
        rememberMe: !prevState.rememberMe,
      }),
      async () => {
        try {
          if (this.state.rememberMe) {
            await AsyncStorage.setItem("@remember_me", "true");
            this.storeData();
          } else {
            await AsyncStorage.removeItem("@remember_me");
            this.removeData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  handleLogin = () => {
    const { email, password } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login Successful");
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        this.props.navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
      });
  };

  render() {
    const { email, password, rememberMe } = this.state;

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
            onChangeText={(text) => this.setState({ email: text })}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={password}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={rememberMe}
            onClick={() => this.handleCheckBoxChange(rememberMe)}
          />
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>Remember Me</Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.replace("SignUp")}
        >
          <Text style={styles.navigateRegisterText}>
            Don't have an account?{" "}
            <Text style={styles.specialText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  inputText: {
    height: 50,
    color: "black",
  },
  checkboxContainer: {
    marginLeft: 45,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  label: {
    margin: 8,
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
  navigateRegisterText: {
    color: "black",
    fontWeight: "bold",
  },
  specialText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default LoginScreen;
