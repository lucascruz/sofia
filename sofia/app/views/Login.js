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

import { Icon } from "native-base"

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      visible: true, 
      icon: "eye-off", 
      logging: "false",
      token: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  changePasswordVisibility (){
    this.setState(prevState =>  ({ 
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye', 
      visible: !prevState.visible,  
    })); 
  }
  
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

      this.props.navigation.navigate("HomeScreen");

    } catch (error) {
      console.debug(error);
    }
  };

  async onLoginPress() {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email);
    console.log(password);

          fetch("http://sofia.huufma.br/api/login", {
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
          })
          .catch((error) => {
             console.log("Houve um problema!")
             console.debug(error);
          });
  }

  render() {
    return (
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../resources/logo.png")} />
            <Text style={styles.subtext}>Sofia</Text>
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
             <View style={{ flexDirection: 'row'}}> 
             <TextInput
                style={{flex:3}}
                placeholder="Senha"
                returnKeyType="go"
                secureTextEntry={this.state.visible}
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <Icon name={this.state.icon} onPress={() => this.changePasswordVisibility()}/>
             </View> 
             
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100
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
    marginLeft: 20,
    marginRight: 20,
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
