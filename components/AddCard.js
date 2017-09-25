import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { sendCardToDeck } from '../actions';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  render() {
    const { container, inputStyle, addCardButton } = styles;
    const { title } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView behavior='padding' style={container}>
        <MaterialCommunityIcons name='cards' size={300} color='#1485ff' />
        <TextInput
          style={inputStyle}
          placeholder='Enter Question'
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
        />

        <TextInput
          style={inputStyle}
          placeholder='Enter Answer'
          multiline={true}
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
        />

        <TouchableOpacity
          onPress={() => this.props.sendCardToDeck(title, {question: this.state.question, answer: this.state.answer})}
          style={addCardButton}>
          <Text style={{ fontSize: 20, color: '#FFF' }}>Submit Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    width: 400,
    height: 80,
    fontSize: 30
  },
  addCardButton: {
    width: 200,
    backgroundColor: '#1485ff',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
})

export default connect(null, { sendCardToDeck })(AddCard);