import React, { Component } from 'react';
import { Text, View, TextInput,KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { sendDeckTitle } from '../actions';

class NewDeck extends Component {
  componentDidUpdate() {
    const title = this.state.deckTitle;

    if(this.props.decks[title]) {
      this.props.navigation.navigate(
        'DeckView',
        {title}
      )
      this.setState({ deckTitle: '' });
    }
  }

  state = {
    deckTitle: '',
    errMessage: ''
  }

  onSubmit() {
    if(this.state.deckTitle !== '') {
      this.props.sendDeckTitle(this.state.deckTitle);
      this.setState({ errMessage: '' })      
    } else {
      this.setState({ errMessage: 'Deck title cannot be empty.' })
    }
  }

  render() {
    const {
      containerStyle,
      headingText,
      inputStyle,
      buttonStyle,
      buttonText,
      err
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

        { this.state.errMessage !== ''
          ?
          <Text style={err}><MaterialCommunityIcons name='close-circle-outline' size={20} color='#F00' />  {this.state.errMessage}</Text>
          :
          <Text></Text> }

        <TouchableOpacity
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
    padding: 10,
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
  },
  err: {
    color: '#F00',
    fontSize: 20
  }
});

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps, { sendDeckTitle })(NewDeck);
