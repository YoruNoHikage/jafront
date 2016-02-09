import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { canUseDOM } from 'exenv';
import cookie from 'cookie';

import test from '../scss/screen.scss';
import fa from 'style!css!font-awesome/css/font-awesome.css';

import configureStore, { reduxRouterMiddleware } from './store/configureStore';
import routes from './routes';

import DevTools from './DevTools'; // TODO: move to another filer

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

const store = configureStore(initialState);
reduxRouterMiddleware.listenForReplays(store);

render(
  <Provider store={store}>
    <div>
      <Router routes={routes} history={browserHistory} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
