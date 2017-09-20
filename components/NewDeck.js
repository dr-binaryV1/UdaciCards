import React, { Component } from 'react';
import { Text, View, TextInput,KeyboardAvoidingView, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class NewDeck extends Component {
  state = {
    deckTitle: ''
  }

  onSubmit() {

  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.containerStyle}>
        <MaterialCommunityIcons name='cards' size={100} color='#1485ff' />
        <Text style={styles.headingText}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({ deckTitle: text })}
          value={this.state.deckTitle}
        />
        <Button
          style={styles.buttonStyle}
          onPress={this.onSubmit}
          title="Submit" />
      </KeyboardAvoidingView>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  headingText: {
    fontSize: 60,
    alignItems: 'center',
    textAlign: 'center'
  },
  inputStyle: {
    width: 500,
    height: 80,
    fontSize: 30
  },
  buttonStyle: {
    padding: 10,
    width: 100
  }
}