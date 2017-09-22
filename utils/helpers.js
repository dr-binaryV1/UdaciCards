import { AsyncStorage } from 'react-native';
const CARD_STORAGE_KEY = 'flashCards:key';

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY, (err, result) => {
    return JSON.parse(result);
  })
}

export function getDeck(title) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result);
      return data[title];
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result);
      data[title].questions.push(card);
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data));
    })
}
