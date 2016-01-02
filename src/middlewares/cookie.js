import cookie from 'cookie';
import { canUseDOM } from 'exenv';

const LOGOUT = 'LOGOUT';

import {
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  RECEIVE_AUTH_GITHUB,
} from '../actions/auth';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = cookie.serialize('token', token, { expires });
}

function dropToken() {
  document.cookie = cookie.serialize('token', '', { expires: new Date() });
}

const cookieMiddleware = store => next => action => {
  if(!canUseDOM) {
    next(action);
  }

  switch(action.type) {
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      const { result, entities } = action.response;
      try {
        if(entities.users[result].token) {
          saveAuthToken(entities.users[result].token);
        }
      } catch(e) {
        console.log('Error when saving token in cookies', e);
      }
      break;
    case RECEIVE_AUTH_GITHUB:
      try {
        if(action.user.token) {
          saveAuthToken(action.user.token);
        }
      } catch(e) {
        console.log('Error when saving token in cookies', e);
      }
      break;
    case LOGOUT:
      console.log('Logout, dropped token');
      break;
  }
  return next(action);
};

export default cookieMiddleware;
