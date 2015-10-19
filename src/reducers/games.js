import { combineReducers } from 'redux';

import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_FAILURE,

  GAME_REQUEST,
  GAME_SUCCESS,
  GAME_FAILURE,

  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  NEW_GAME_RESET,
} from '../actions/game';

const initialCreate = {name: '', description: ''};
function create(state = initialCreate, action) {
  switch(action.type) {
    case NEW_GAME_REQUEST:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };
    case NEW_GAME_SUCCESS:
      return {
        ...state,
        slug: action.response.result,
        isLoading: false,
      };
    case NEW_GAME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case NEW_GAME_RESET:
      return {
        ...initialCreate,
      };
    default:
      return state;
  }
}

function games(state = { loadingItem: true, loadingList: true, loadingNew: false, new: false }, action) {
  switch(action.type) {
    // case NEW_GAME_REQUEST:
    //   return {
    //     ...state,
    //     new: action.payload,
    //     loadingNew: true,
    //   };
    // case NEW_GAME_SUCCESS:
    // case NEW_GAME_FAILURE:
    //   return {
    //     ...state,
    //     new: false,
    //     loadingNew: false,
    //   };
    case GAME_REQUEST:
      return {
        ...state,
        loadingItem: true,
      };
    case GAME_SUCCESS:
    case GAME_FAILURE:
      return {
        ...state,
        loadingItem: false,
      };
    case GAMES_REQUEST:
      return {
        ...state,
        loadingList: true,
      };
    case GAMES_SUCCESS:
    case GAMES_FAILURE:
      return {
        ...state,
        loadingList: false,
      };
    default:
      return state;
  }
}

export default combineReducers({
  games,
  create,
})
