import { Schemas, CALL_API } from '../middlewares/api';

export const REQUEST_CHECK_USERNAME = 'REQUEST_CHECK_USERNAME';
export function requestCheckUsername(username) {
  return {
    type: REQUEST_CHECK_USERNAME,
    username,
  };
}

export const RECEIVE_CHECK_USERNAME = 'RECEIVE_CHECK_USERNAME';
export function receiveCheckUsername(username, isTaken = false) {
  return {
    type: RECEIVE_CHECK_USERNAME,
    username,
    isTaken: isTaken,
    receivedAt: Date.now(),
  };
}

export function checkUsername(username) {
  return async function(dispatch) {
    dispatch(requestCheckUsername(username));
    try {
      // TODO : own method in our API
      const response = await fetch(`https://api.github.com/users/${username}`);

      dispatch(receiveCheckUsername(username, response.status !== 404));
    } catch(err) {
      console.log('todo, error handling');
      dispatch(receiveCheckUsername(username));
    }
  };
}

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export function requestRegistration(username, email, password) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `register`,
      types: [REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE],
      schema: Schemas.USER,
      payload: {
        username,
        email,
        password,
      }
    }
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function requestLogin(username, password) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `login`,
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      schema: Schemas.USER,
      payload: {
        username,
        password,
      }
    }
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  };
}

/**
 * Auth GitHub
 * ===========
 *
 * 1. Redirect user to GitHub authorization page
 * 2. User is then redirected to /github
 * 3. Request is made to get the access_token and check username
 * 4. If username is taken, text input appears to get a new one available
 */

export const REQUEST_AUTH_GITHUB = 'REQUEST_AUTH_GITHUB';
export function requestAuthGitHub(code, username = null) {
  return {
    type: REQUEST_AUTH_GITHUB,
    code,
    username,
  };
}

export const RECEIVE_AUTH_GITHUB = 'RECEIVE_AUTH_GITHUB';
export function receiveAuthGitHub(user, error = false) {
  return {
    type: RECEIVE_AUTH_GITHUB,
    error,
    user,
  };
}

export function authGitHub(code, username) {
  return async function(dispatch) {
    dispatch(requestAuthGitHub(code, username));
    try {
      // TODO : server-side
      // const response = await fetch(`http://api.jeuxamateurs.fr/register`);
      const response = await new Promise(function(resolve, reject) {
        setTimeout(resolve, 5000, {
          username: username || 'YoruNoHikage',
          token: 'jwt token github',
        });
      });

      // TODO: remove, used to simulate username duplication
      if(!username) {
        throw {
          message: 'username is already taken',
        };
      }

      dispatch(receiveAuthGitHub(response));
      dispatch(receiveLogin(response));
    } catch(err) {
      console.log('todo, error handling', err);
      dispatch(receiveAuthGitHub({}, err.message));
    }
  };
}
