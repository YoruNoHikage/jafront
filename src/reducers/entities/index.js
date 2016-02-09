import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import games, { initialState as initialGames } from './games';
import users, { initialState as initialUsers } from './users';

export const initialEntities = {
  users: initialUsers,
  games: initialGames,
  technologies: {},
};

export default function entities(state = initialEntities, action) {
  let newState = state;
  if(action.response && action.response.entities) {
    // if(action.type === 'FAVORITE_GAME_SUCCESS' && action.request.method === 'DELETE') {
    //   let { users, games } = state;
    //
    //   // params
    //   const username = action.response.result;
    //   const slug = /user\/favorites\/(.*)+/gm.exec(action.request.endpoint)[1];
    //
    //   // filtering to remove the relationship
    //   const watchers = games[slug].watchers.filter(e => e != username);
    //   const watchedGames = users[username].watchedGames.filter(e => e != slug);
    //
    //   // always immutable state
    //   newState = {
    //     ...state,
    //     games: {...games, [slug]: {...games[slug], watchers}},
    //     users: {...users, [username]: {...users[username], watchedGames}},
    //   };
    // }

    newState = merge({}, newState, action.response.entities);
  }

  return combineReducers({
    games,
    users,
    technologies: (state = {}, action) => state,
  })(newState, action);
}
