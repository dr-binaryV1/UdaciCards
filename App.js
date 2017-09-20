import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Constants } from 'expo';
import { TabNavigator } from 'react-navigation';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';

function CardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    const Tabs = TabNavigator({
      DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Deck List'
        }
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions: {
          tabBarLabel: 'New Deck'
        }
      }
    });

    return (
      <View style={{flex: 1}}>
        <CardStatusBar backgroundColor={'#1485ff'} barStyle='light-content' />
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
