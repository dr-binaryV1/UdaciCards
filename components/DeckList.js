import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../utils/helpers';

import Deck from './Deck';

export default class DeckList extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    getDecks().then(result => this.setState({ decks: result }));
  }

  render() {
    const{ decks } = this.state;
    console.log(decks);

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
        <FlatList
          data={data}
          renderItem={({item}) => <Deck title={item.title} cardNumber={item.cardNumber} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
