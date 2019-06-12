/*HomeScreen.js*/
import React, { Component } from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { Container, Tab, TabHeading, Tabs, Text} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import MainHeader from "../components/MainHeader";
import FAQ from "../components/FAQ";
import Home from "../components/Home";
import News from "../components/News";
import ErrorNoInternetMessage from "../components/ErrorNoInternetMessage";

export default class HomeScreen extends Component {
  /*Removendo header padrão da tela*/
  static navigationOptions = {
    header: null

  };

  render() {
    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>

        <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null}>
          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }}><Text>Perguntas</Text></TabHeading>}>
            <ErrorNoInternetMessage />
            <Home navigation={this.props.navigation} />
          </Tab>

          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }} ><Text>Notícias</Text></TabHeading>}>
            <News navigation={this.props.navigation}/>
          </Tab>

          <Tab heading={ <TabHeading style={{ backgroundColor: "#3c8dbc" }}><Text>FAQ</Text></TabHeading>}>
            <FAQ navigation={this.props.navigation}/>
          </Tab>

        </Tabs>

      </Container>
    );
  }

}
