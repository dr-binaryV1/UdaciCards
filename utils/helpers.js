import { AsyncStorage } from 'react-native';
const CARD_STORAGE_KEY = 'flashCards';

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY, (err, result) => {
    return result;
  })
}

export function getDeck(id) {

}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title
    }
  }))
}

export function addCardToDeck(title, card) {

}
