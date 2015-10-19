import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { devTools, persistState } from 'redux-devtools';
import cookie from '../middlewares/cookie';
import { api } from '../middlewares/api';

import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';

import rootReducer from '../reducers';

const middlewares = [thunk, cookie, api];
if(process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    collapsed: true,
  }));
}

const enhancers = [applyMiddleware(...middlewares), reduxReactRouter({createHistory})];
if(process.env.NODE_ENV !== 'production') {
  enhancers.push(compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  ));
}

const finalCreateStore = compose(...enhancers)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
