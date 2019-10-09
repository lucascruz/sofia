/*HomeScreen.js*/
import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Tab, Tabs} from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

import MainHeader from "../components/MainHeader";
import FAQ from "../components/FAQ";
import Home from "../components/Home";

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
          <Tab heading="Perguntas" tabStyle={{backgroundColor: '#3c8dbc'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#3c8dbc'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <Home navigation={this.props.navigation} />
          </Tab>
          
          <Tab heading="Dúvidas" tabStyle={{backgroundColor: '#3c8dbc'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#3c8dbc'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <FAQ navigation={this.props.navigation}/>
          </Tab>

        </Tabs>

      </Container>
    );
  }

}
