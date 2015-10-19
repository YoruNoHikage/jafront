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

export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export function requestRegistration(username, email, password) {
  return {
    type: REQUEST_REGISTRATION,
    username,
    email,
    password,
  };
}

export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION';
export function receiveRegistration(user) {
  return {
    type: RECEIVE_REGISTRATION,
    user,
  };
}

export function checkRegistration(username, email, password) {
  return async function(dispatch) {
    dispatch(requestRegistration(username, email, password));
    try {
      // TODO : own method in our API
      const response = await new Promise(function(resolve, reject) {
        setTimeout(resolve, 5000, {
          username,
          token: 'jwt token here',
          email,
        });
      });

      dispatch(receiveRegistration(response));
    } catch(err) {
      console.log('checkRegistration', 'todo, error handling');
      dispatch(receiveRegistration(err));
    }
  };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(username, password) {
  return {
    type: REQUEST_LOGIN,
    username,
    password,
  };
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export function receiveLogin(user) {
  return {
    type: RECEIVE_LOGIN,
    user,
  };
}

export function checkLogin(username, password) {
  return async function(dispatch) {
    dispatch(requestLogin(username, password));
    try {
      // TODO : own method in our API
      const response = await new Promise(function(resolve, reject) {
        setTimeout(resolve, 5000, {
          username,
          token: 'jwt token here',
          email: 'jambon@patate.fr',
        });
      });

      dispatch(receiveLogin(response));
    } catch(err) {
      console.log('checkLogin', 'todo, error handling');
      dispatch(receiveLogin(err));
    }
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
