import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

function CardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

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
    const navOptions = {
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#1485ff'
      }
    }
    const MainNavigator = StackNavigator({
      Home: {
        screen: Tabs,
        navigationOptions: { ...navOptions, title: 'FlashCards' }
      },
      DeckView: {
        screen: DeckView,
        navigationOptions: navOptions
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: { ...navOptions, title: 'Add Card' }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: { ...navOptions, title: 'Quiz' }
      }
    })

    return (
      <Provider store={createStore(reducer, applyMiddleware(ReduxThunk))}>
        <View style={{flex: 1}}>
          <CardStatusBar backgroundColor={'#1485ff'} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
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
