import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

class Quiz extends Component {
  state = { 
    currentQuestion: 1,
    correctScore: 0,
    currentlyViewing: 'Question'
  }

  render() {
    const {
      buttonText,
      buttonContainer,
      circle,
      container,
      counterText,
      mainFontStyle,
      mainView,
      toggleButton,
      toggleButtonText,
      correctButton,
      incorrectButton,
      backToListButton,
      scoreHeading,
      score
    } = styles;

    if(this.state.currentQuestion <= this.props.deck.questions.length) {
      return (
        <View style={container}>
          <Text style={counterText}>{this.state.currentQuestion}/{this.props.deck.questions.length}</Text>

          <View style={mainView}>
            <Text style={mainFontStyle}>
              { this.state.currentlyViewing === 'Question'
                ?
                  this.props.deck.questions[this.state.currentQuestion-1].question
                : 
                  this.props.deck.questions[this.state.currentQuestion-1].answer}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.state.currentlyViewing === 'Question'
                  ?
                  this.setState({ currentlyViewing: 'Answer' }) 
                  : 
                  this.setState({ currentlyViewing: 'Question' });
              }}
              style={toggleButton}>
              <Text style={toggleButtonText}>
                { this.state.currentlyViewing === 'Question'
                  ?
                  'Answer' : 'Question' }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => (
                this.setState({ 
                  currentQuestion: this.state.currentQuestion + 1,
                  correctScore: this.state.correctScore + 1,
                  currentlyViewing: 'Question'
                }))
              }
              style={correctButton}>
              <Text style={buttonText}>Corrent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => (
                this.setState({
                  currentQuestion: this.state.currentQuestion + 1,
                  currentlyViewing: 'Question'
                })
              )}
              style={incorrectButton}>
              <Text style={buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={container}>
          <Text style={mainFontStyle}>End of Quiz</Text>

          <View style={mainView}>
            <Text style={scoreHeading}>You Score:</Text>
            <View style={circle}>
              <Text style={score}>{Math.round((this.state.correctScore / this.props.deck.questions.length) * 100)}%</Text>
            </View>
            <Text style={{fontSize: 25, marginTop: 10}}>{ (this.state.correctScore / this.props.deck.questions.length) * 100 > 50 
              ?
              'Awesome! You did well.' 
              : 
              'Sorry! Better luck next time.' 
              }</Text>
          </View>
          <View style={buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  currentQuestion: 1,
                  correctScore: 0
                });
              }}
              style={correctButton}>
              <Text style={buttonText}>Retake Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(
                  'DeckList'
                )
              }}
              style={backToListButton}>
              <Text style={{ fontSize: 20, color: '#00B300' }}>Go to Deck List</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  counterText: {
    fontSize: 20
  },
  mainView: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  mainFontStyle: {
    fontSize: 35,
    textAlign: 'center'
  },
  toggleButtonText: {
    fontSize: 20,
    color: '#F00'
  },
  toggleButton: {
    marginTop: 20
  },
  correctButton: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#00B300',
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  incorrectButton: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#F00',
    marginTop: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backToListButton: {
    padding: 20,
    borderRadius: 5,
    borderColor: '#00B300',
    borderWidth: 1,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  },
  scoreHeading: {
    fontSize: 30
  },
  score: {
    fontSize: 50,
    color: '#FFF'
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B300'
  }
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz);