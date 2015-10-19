import { combineReducers } from 'redux';

import {
  REQUEST_CHECK_USERNAME,
  RECEIVE_CHECK_USERNAME,

  RECEIVE_REGISTRATION,

  REQUEST_LOGIN,
  RECEIVE_LOGIN,

  REQUEST_AUTH_GITHUB,
  RECEIVE_AUTH_GITHUB,
} from '../actions/auth';

function user(state = null, action) {
  switch(action.type) {
    case RECEIVE_LOGIN:
    case RECEIVE_REGISTRATION:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
}

const initialStateUsername = {
  value: '',
  status: '',
};

function username(state = initialStateUsername, action) {
  switch(action.type) {
    case REQUEST_CHECK_USERNAME:
      return {
        ...state,
        status: 'loading',
      };
    case RECEIVE_CHECK_USERNAME:
      return {
        ...state,
        value: action.username,
        status: action.isTaken ? 'error' : 'success',
      };
    default:
      return state;
  }
}

const initialStateGitHub = {
  user: null,
  isLoading: false,
  error: null,
};

function github(state = initialStateGitHub, action) {
  switch(action.type) {
    case REQUEST_AUTH_GITHUB:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_AUTH_GITHUB:
      return {
        ...state,
        user: action.user,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default combineReducers({
  user,
  username,
  github,
});
