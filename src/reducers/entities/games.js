import { FAVORITE_GAME_SUCCESS } from '../../actions/game';

export const initialState = {};

export default function games(state = {}, action) {
  switch(action.type) {
    case FAVORITE_GAME_SUCCESS:
      if(action.request.method === 'DELETE') {
        const username = action.response.result;
        const slug = /user\/favorites\/(.*)+/gm.exec(action.request.endpoint)[1];

        const watchers = state[slug].watchers.filter(e => e != username);
        return {
          ...state,
          [slug]: {
            ...state[slug],
            watchers,
          },
        };
      }
    default:
      return state;
  }
}
