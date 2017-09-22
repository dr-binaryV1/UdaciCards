import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
} from '../utils/helpers';

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';

export function fetchDecks() {
  getDecks().then((decks) => {
    return {
      type: GET_DECKS,
      decks
    }
  })
}
