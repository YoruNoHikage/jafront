import { FAVORITE_GAME_SUCCESS } from '../../actions/game';

export const initialState = {};

export default function users(state = {}, action) {
  switch(action.type) {
    case FAVORITE_GAME_SUCCESS:
      if(action.request.method === 'DELETE') {
        const username = action.response.result;
        const slug = /user\/favorites\/(.*)+/gm.exec(action.request.endpoint)[1];

        const watchedGames = state[username].watchedGames.filter(e => e != slug);
        return {
          ...state,
          [username]: {
            ...state[username],
            watchedGames,
          }
        }
      }
    default:
      return state;
  }
}
