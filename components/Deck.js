import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
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
});
