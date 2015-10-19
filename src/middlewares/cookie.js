import cookie from 'cookie';
import { canUseDOM } from 'exenv';

import {
  RECEIVE_REGISTRATION,
  RECEIVE_LOGIN,
  RECEIVE_AUTH_GITHUB,
} from '../actions/auth';

function saveAuthToken(token) {
  if(canUseDOM) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = cookie.serialize('token', token, { expires });
  }
}

const cookieMiddleware = store => next => action => {
  switch(action.type) {
    case RECEIVE_REGISTRATION:
    case RECEIVE_LOGIN:
    case RECEIVE_AUTH_GITHUB:
      try {
        if(action.user.token) {
          saveAuthToken(action.user.token);
        }
      } catch(e) {
        console.log('Error when saving token in cookies');
      }
    break;
  }
  return next(action);
};

export default cookieMiddleware;
