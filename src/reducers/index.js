import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';

import { routerStateReducer as router } from 'redux-router';
import games from './games';
import auth from './auth';

const initialEntities = {
  users: {},
  games: {},
  technologies: {},
}

function entities(state = initialEntities, action) {
  if(action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const rootReducer = combineReducers({
  entities,
  auth,
  games,
  router,
});

export default rootReducer;
