import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks } from '../utils/helpers';

import Deck from './Deck';

export default class DeckList extends Component {
  state = {
    decks: undefined
  }

  componentDidMount() {
    getDecks().then(result => this.setState({ decks: result }));
  }

  render() {
    let decks = '';
    let decksData = '';
    if(this.state.decks) { 
      decks = JSON.parse(this.state.decks);
      decksData = Object.keys(decks).map((key) => {
        return decks[key];
      });
    }

    const data = [
      {
        title: 'React',
        cardNumber: 3
      },
      {
        title: 'Udacity',
        cardNumber: 1
      }
    ]

    return (
      <View style={styles.container}>
        {decksData ?
          <FlatList
            data={decksData}
            renderItem={({item}) => <Deck navigation={this.props.navigation} title={item.title} cardNumber={item.questions.length} />}
            keyExtractor={(item, index) => index}
          /> : (
              <View style={styles.subContainer}>
                <MaterialCommunityIcons name='information-outline' size={200} color='#1485ff' />
                <Text style={styles.textStyle}>No Deck Available. Add a new Deck!</Text>
              </View>
            )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
