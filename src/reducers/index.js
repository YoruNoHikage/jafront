import { combineReducers } from 'redux';

import { routeReducer } from 'redux-simple-router';
import entities from './entities';
import games from './games';
import auth from './auth';

const rootReducer = combineReducers({
  entities,
  auth,
  games,
  routing: routeReducer,
});

export default rootReducer;
