import { fork } from 'redux-saga/effects';

import auth from './auth';
import user from './user';

export default function* root(getState) {
  yield fork(auth);
  yield fork(user);
}
