import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Icon, Textarea } from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import BackHeader from "../components/BackHeader";

export default class Search extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      source: "",
      question: "",
      isLoading: false
    };
  }

  showLoader = bool => this.setState({ isLoading: bool });

  async onSearch() {
    var question = this.state.question;

    if (!this.props.navigation.state.params.isConnected) {
      this.props.navigation.navigate("NewSearch", { question });
    } else {
      this.showLoader(true);

      var token = await AsyncStorage.getItem("token");

      let formdata = new FormData();

      formdata.append("description", question);

      return fetch("http://sofia.huufma.br/api/solicitation/search", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formdata
      })
        .then(response => response.json())
        .then(responseJson => {
          console.debug("RETURNING...");
          console.debug(responseJson);

          var questions = responseJson.data;

          shouldUpdate = true;

          this.showLoader(false);

          this.props.navigation.navigate("RelatedQuestionsView", {
            questions,
            question
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View>
        <BackHeader
          navigation={this.props.navigation}
          name="Como posso te ajudar?"
        />
        {this.state.isLoading ? (
          <ActivityIndicator style={styles.load} size="large" color="#3c8dbc" />
        ) : (
          <View style={styles.Container}>
            <Text style={styles.Title}>
              Digite aqui sua pergunta para que sejam encontradas respostas
              adequadas
            </Text>

            <Textarea
              style={styles.Input}
              value={this.state.question}
              onChangeText={question => this.setState({ question })}
              placeholder="Digite aqui..."
              placeholderTextColor="#999"
              bordered
            />

            <TouchableNativeFeedback onPress={this.onSearch.bind(this)}>
              <View style={styles.Button}>
                <Icon
                  style={[styles.Icon, { color: "#FFF" }]}
                  type="MaterialIcons"
                  name="search"
                />
                <Text style={styles.TextLight}>Pesquisar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
      </View>
    );
  }
}

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginLeft: 37,
    marginRight: 37,
    marginTop: 20
  },

  Title: {
    fontSize: 16
  },

  Input: {
    width: "100%",
    height: height * 0.5,
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20
  },

  Button: {
    width: "100%",
    height: 54,
    backgroundColor: "#3c8dbc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  Icon: {
    position: "absolute",
    left: 20,
    color: "#202020",
    fontSize: 24
  },

  TextLight: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center"
  }
});
