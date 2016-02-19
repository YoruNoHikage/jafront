import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { persistState } from 'redux-devtools';
import cookie from '../middlewares/cookie';
import { api } from '../middlewares/api';

import routes from '../routes';
import DevTools from '../DevTools';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export const reduxRouterMiddleware = syncHistory(browserHistory);
const middlewares = [thunk, api, cookie, reduxRouterMiddleware, createSagaMiddleware(rootSaga)];
if(process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    collapsed: true,
  }));
}

const enhancers = [];
if(process.env.NODE_ENV !== 'production') {
  enhancers.push(compose(
    DevTools.instrument(),
    persistState(getDebugSessionKey()),
  ));
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    ),
  );

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
