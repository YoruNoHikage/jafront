import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './history';
import { syncHistoryWithStore } from 'react-router-redux';
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
    entities: {
      users: {
        'YoruNoHikage': {
          username: 'YoruNoHikage',
          token: localCookie.token,
          email: 'jambon@cookie.com',
        }
      }
    },
    auth: {
      user: 'YoruNoHikage',
    }
  };
}

let DevTools = null;
if(process.env.NODE_ENV !== 'production') {
  DevTools = require('./DevTools').default;
}

const store = configureStore(initialState);
syncHistoryWithStore(history, store);

render(
  <Provider store={store}>
    <div>
      <Router routes={routes} history={history} />
      {DevTools && <DevTools />}
    </div>
  </Provider>,
  document.getElementById('app')
);
