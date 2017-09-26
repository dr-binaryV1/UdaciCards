import React, {Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { getDeck } from '../utils/helpers';
import { deleteDeck } from '../actions';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    }
  }

  delete() {
    const { deck } = this.props;

    Alert.alert(
      `Delete ${deck.title}?`,
      `You are about to delete '${deck.title}' Deck`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          this.props.deleteDeck(deck.title);
          this.props.navigation.goBack();
        }},
      ],
      { cancelable: false }
    )
  }

  startQuiz() {
    const { deck } = this.props;

    if(deck.questions.length > 0) {
      this.props.navigation.navigate(
        'Quiz',
        {title: deck.title}
      )
    } else if(deck.questions.length === 0 && Platform.OS !== 'ios') {
      ToastAndroid.show('No Cards in this Deck', ToastAndroid.SHORT);
    }
  }

  render() {
    const { container, headerText, detailText, addCardButton, startQuizButton } = styles;
    const { deck } = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={container}>
          <MaterialCommunityIcons name='cards' size={300} color='#1485ff' />
          <Text style={headerText}>{deck.title}</Text>
          <Text style={detailText}>{deck.questions ? `${deck.questions.length} Card(s)` : '0 Card'}</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              {title: deck.title}
            )}
            style={addCardButton}>
            <Text style={{ fontSize: 20 }}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.startQuiz.bind(this)}
            style={startQuizButton}>
            <Text style={{ fontSize: 20, color: '#FFF' }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.delete.bind(this)}>
          <MaterialCommunityIcons name='delete' color='#F00' size={50} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 50,
  },
  detailText: {
    fontSize: 35,
    color: '#BBB'
  },
  addCardButton: {
    width: 200,
    borderWidth: 1,
    borderColor: '#1485ff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  startQuizButton: {
    width: 200,
    backgroundColor: '#1485ff',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps, { deleteDeck })(DeckView);
