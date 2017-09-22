import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getDeck } from '../utils/helpers';

export default class DeckView extends Component {
  state = {deck: ''}

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    }
  }

  componentDidMount() {
    const { title } = this.props.navigation.state.params;
    getDeck(title).then(deck => this.setState({ deck }));
  }

  render() {
    const { container, headerText, detailText, addCardButton, startQuizButton } = styles;
    const { title, questions } = this.state.deck;

    return (
      <View style={container}>
        <MaterialCommunityIcons name='cards' size={300} color='#1485ff' />
        <Text style={headerText}>{title}</Text>
        <Text style={detailText}>{questions ? `${questions.length} Card(s)` : '0 Card'}</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            {title}
          )}
          style={addCardButton}>
          <Text style={{ fontSize: 20 }}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={startQuizButton}>
          <Text style={{ fontSize: 20, color: '#FFF' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 50,
  },
  detailText: {
    fontSize: 35,
    color: '#BBB'
  },
  addCardButton: {
    width: 200,
    borderWidth: 1,
    borderColor: '#1485ff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150
  },
  startQuizButton: {
    width: 200,
    backgroundColor: '#1485ff',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});
