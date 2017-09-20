import React from 'react';
import { Text, View } from 'react-native';

export default function Deck(props) {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Deck</Text>
      <Text style={styles.cardNumberDesc}>3 cards</Text>
    </View>
  )
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 30
  },
  cardNumberDesc: {
    fontSize: 20,
    color: '#BBB'
  }
}