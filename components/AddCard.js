import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { sendCardToDeck } from '../actions';

class AddCard extends Component {
  componentDidUpdate(){
    const {title} = this.props.navigation.state.params;
    const ques = this.props.deck.questions.filter((obj) => {
      return obj.question === this.state.question
    }).map(question => { return question });

    if(ques.length > 0) {
      this.props.navigation.navigate(
        'DeckView',
        {title}
      );
      this.setState({ question: '', answer: '' });
    }  
  }

  state = {
    question: '',
    answer: '',
    questionErr: '',
    answerErr: ''
  }

  submitCard() {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;

    if(question !== '' && answer !== '') {
      this.props.sendCardToDeck(title, {question, answer});
      this.setState({ questionErr: '', answerErr: '' })
    }

    if(question === '') {
      this.setState({ questionErr: 'Question field cannot be empty.' })
    } else {
      this.setState({ questionErr: '' });
    }

    if(answer === '') {
      this.setState({ answerErr: 'Answer field cannot be empty.' })
    } else {
      this.setState({ answerErr: '' });
    }
  }

  render() {
    const { container, inputStyle, addCardButton, err } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={container}>
        <MaterialCommunityIcons name='cards' size={300} color='#1485ff' />
        
        <TextInput
          style={inputStyle}
          placeholder='Enter Question'
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
        />
        { this.state.questionErr !== ''
          ?
          <Text style={err}><MaterialCommunityIcons name='close-circle-outline' size={20} color='#F00' />  {this.state.questionErr}</Text>
          :
          <Text></Text> }

        <TextInput
          style={inputStyle}
          placeholder='Enter Answer'
          multiline={true}
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
        />
        { this.state.answerErr !== ''
          ?
          <Text style={err}><MaterialCommunityIcons name='close-circle-outline' size={20} color='#F00' />  {this.state.answerErr}</Text>
          :
          <Text></Text> }

        <TouchableOpacity
          onPress={this.submitCard.bind(this)}
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
  },
  err: {
    color: '#F00',
    fontSize: 20
  }
})

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps, { sendCardToDeck })(AddCard);