/*DraftIssues.js*/
import React, { Component } from "react";

import {
  FlatList,

} from "react-native";

import {
  Container,

} from "native-base";

import Issue from "./Issue";
import BackHeader from "./BackHeader";

export default class DraftIssues extends Component {
  /*Removendo header padrão*/
  static navigationOptions = {
    header: null
  };

  render() {
    const answeredIssues = this.props.navigation.state.params.draftIssues;

    return (
      <Container>
        <BackHeader navigation={this.props.navigation} name="Rascunho" />

        <FlatList
          data={answeredIssues}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Issue navigation={this.props.navigation} question={item}/>}
        />

      </Container>
    );
  }

}
