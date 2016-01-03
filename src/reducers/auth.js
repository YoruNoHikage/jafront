import { combineReducers } from 'redux';

import {
  REQUEST_CHECK_USERNAME,
  RECEIVE_CHECK_USERNAME,

  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,

  LOGOUT,

  REQUEST_AUTH_GITHUB,
  RECEIVE_AUTH_GITHUB,
} from '../actions/auth';

function user(state = null, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
      const { result, entities } = action.response;
      return {
        ...state,
        ...entities.users[result], // TODO: make it just a reference to the user entity
      };
    case LOGOUT:
      return null;
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
