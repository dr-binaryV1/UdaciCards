import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../utils/helpers';

import Deck from './Deck';

export default class DeckList extends Component {
  state = {
    decks: undefined
  }

  componentDidMount() {
    getDecks().then(result => this.setState({ decks: result }));
  }

  onNavigate(title) {
    
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
            renderItem={({item}) => <Deck navigation={this.props.navigation} title={item.title} cardNumber={0} />}
            keyExtractor={(item, index) => index}
          /> : <Text>''</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
