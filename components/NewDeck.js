import React, { Component } from 'react';
import { Text, View, TextInput,KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { sendDeckTitle } from '../actions';

class NewDeck extends Component {
  componentDidUpdate() {
    if(this.props.decks[this.state.deckTitle]) {
      this.props.navigation.navigate(
        'DeckView',
        {title: this.state.deckTitle}
      )
    }
  }

  state = {
    deckTitle: ''
  }

  onSubmit() {
    if(this.state.deckTitle !== '') {
      this.props.sendDeckTitle(this.state.deckTitle);      
    }
  }

  render() {
    const {
      containerStyle,
      headingText,
      inputStyle,
      buttonStyle,
      buttonText
    } = styles;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={containerStyle}>
        <MaterialCommunityIcons name='cards' size={150} color='#1485ff' />
        <Text style={headingText}>What is the title of your new deck?</Text>

        <TextInput
          style={inputStyle}
          placeholder='Enter Deck Title'
          onChangeText={(text) => this.setState({ deckTitle: text })}
          value={this.state.deckTitle}
        />
        <TouchableOpacity
          disabled={this.state.deckTitle === '' ? true : false}
          style={buttonStyle}
          onPress={this.onSubmit.bind(this)}>
          <Text style={buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
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
    width: 400,
    height: 80,
    fontSize: 30
  },
  buttonStyle: {
    padding: 10,
    width: 100,
    backgroundColor: '#1485ff',
    borderWidth: 1,
    borderColor: '#1485ff',
    marginTop: 5,
    borderRadius: 3
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps, { sendDeckTitle })(NewDeck);
