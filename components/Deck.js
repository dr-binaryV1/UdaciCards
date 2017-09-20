import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Deck(props) {
  return (
    <TouchableOpacity>
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <Text style={styles.cardNumberDesc}>{`${props.cardNumber} card(s)`}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0FF',
    marginBottom: 20,
    height: 150
  },
  titleStyle: {
    fontSize: 30
  },
  cardNumberDesc: {
    fontSize: 20,
    color: '#BBB'
  }
}