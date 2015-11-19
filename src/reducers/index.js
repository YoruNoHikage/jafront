import { combineReducers } from 'redux';

import { routerStateReducer as router } from 'redux-router';
import entities from './entities';
import games from './games';
import auth from './auth';

const rootReducer = combineReducers({
  entities,
  auth,
  games,
  router,
});

export default rootReducer;
