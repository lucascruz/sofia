import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
<<<<<<< HEAD
      logging: "false"
=======
      logging: "false",
      token: ""

>>>>>>> developer
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  async login(responseJson) {
    try {
      await AsyncStorage.setItem("token", responseJson.token);
      await AsyncStorage.setItem("logging", "true");

      const t = await AsyncStorage.getItem("logging");
      this.setState({
        logging: "true",
        token: t
      })

      console.debug("TOKEN")
      console.debug(this.state.token);

    } catch (error) {
      console.debug(error);
    }
  };

  async onLoginPress() {
    const email = "solicitante@solicitante.com";
    const password = "123456";

    fetch("http://plataforma.homolog.huufma.br/api/login", {
             method: 'POST',
             headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
             body: JSON.stringify({
               email: email,
               password: password
             })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            this.login(responseJson);

            if(this.state.logging == "true") {
              this.props.navigation.navigate("HomeScreen");
            } else {
              Alert.alert("E-mail ou senha incorretos!");
            }
          })
          .catch((error) => {
             console.debug(error);
          });
  }

  render() {
    return (
      <View style={styles.container}>
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("./logo.png")} />
            <Text style={styles.subtext}>Quiz</Text>
          </View>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.window}>
              <TextInput
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
              <TextInput
                placeholder="Senha"
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  subtext: {
    color: "black",
    marginTop: 10,
    width: 200,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 50
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "#3c8dbc",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#3c8dbc",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  }
});

AppRegistry.registerComponent("Login", () => Login);
