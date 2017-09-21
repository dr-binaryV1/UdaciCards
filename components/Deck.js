import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { getDeck } from '../utils/helpers';

export default function Deck(props) {
  return (
    <TouchableOpacity
      onPress={() => /*getDeck(props.title).then(result => console.log(result))*/ 
        props.navigation.navigate(
          'DeckView',
          {title: props.title}
      )}>
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <Text style={styles.cardNumberDesc}>{`${props.cardNumber} card(s)`}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    height: 150,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0,24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  titleStyle: {
    fontSize: 30
  },
  cardNumberDesc: {
    fontSize: 20,
    color: '#BBB'
  }
});
