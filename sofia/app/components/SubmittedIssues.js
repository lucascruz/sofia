/*SubmittedIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

import AnsweredIssue from "./AnsweredIssue";
import BackHeader from "./BackHeader";

export default class SubmittedIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const submittedIssues = this.props.navigation.state.params.submittedIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Enviados" />

        <FlatList
          data={submittedIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <AnsweredIssue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
