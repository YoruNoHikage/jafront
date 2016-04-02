import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import entities from './entities';
import games from './games';
import auth from './auth';

const rootReducer = combineReducers({
  entities,
  auth,
  games,
  routing: routerReducer,
});

export default rootReducer;
