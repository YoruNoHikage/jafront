import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter as Router } from 'redux-router';
import { canUseDOM } from 'exenv';
import cookie from 'cookie';

import test from '../scss/screen.scss';
import fa from 'style!css!font-awesome/css/font-awesome.css';

import configureStore from './store/configureStore';
import routes from './routes';

let localCookie, initialState = {};
if(canUseDOM) {
  localCookie = cookie.parse(document.cookie);
}
if(localCookie && localCookie.token) {
  initialState = {
    auth: {
      user: {
        username: 'YoruNoHikage',
        token: localCookie.token,
        email: 'jambon@cookie.com',
      }
    }
  };
}

const store = configureStore(initialState);

render(
  <div>
    <Provider store={store}>
      <Router routes={routes} />
    </Provider>
    {process.env.NODE_ENV !== 'production' ? require('./createDevTools').default(store) : ''}
  </div>,
  document.getElementById('app')
);
