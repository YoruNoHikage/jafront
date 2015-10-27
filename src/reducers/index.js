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

    let newState = null;
    if(action.type === 'FAVORITE_GAME_SUCCESS' && action.request.method === 'DELETE') {
      let { users, games } = state;

      // params
      const username = action.response.result;
      const slug = /user\/favorites\/(.*)+/gm.exec(action.request.endpoint)[1];

      // filtering to remove the relationship
      const watchers = games[slug].watchers.filter(e => e != username);
      const watchedGames = users[username].watchedGames.filter(e => e != slug);

      // always immutable state
      newState = {
        ...state,
        games: {...games, [slug]: {...games[slug], watchers}},
        users: {...users, [username]: {...users[username], watchedGames}},
      };
    }

    return merge({}, newState || state, action.response.entities);
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
