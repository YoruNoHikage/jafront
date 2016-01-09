import { combineReducers } from 'redux';

import {
  REQUEST_CHECK_USERNAME,
  RECEIVE_CHECK_USERNAME,

  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,

  AUTH_GITHUB_REQUEST,
  AUTH_GITHUB_SUCCESS,
  AUTH_GITHUB_FAILURE,

  LOGOUT,
} from '../actions/auth';

function user(state = null, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
    case AUTH_GITHUB_SUCCESS:
      return action.response.result;
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
  isLoading: false,
  error: '',
};

function github(state = initialStateGitHub, action) {
  switch(action.type) {
    case AUTH_GITHUB_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_GITHUB_FAILURE:
    case AUTH_GITHUB_SUCCESS:
      return {
        ...state,
        error: action.error || null,
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
