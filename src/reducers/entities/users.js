import { FAVORITE_GAME_SUCCESS } from '../../actions/game';

export const initialState = {};

// function followUserReducer(state = [], action) {
//   if(action.type === 'FOLLOW_USER_SUCCESS') {
//     if(action.request.method === 'DELETE') {
//       return state.filter(e => e != action.request.method);
//     }
//     return [new Set([...state, action.request.])];
//   }
//
//   return state;
// }

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
        };
      }
    // case 'FOLLOW_USER_SUCCESS':
    //   return {
    //     ...state,
    //     [username]: followUserReducer(state[username].followers, action),
    //   };
    default:
      return state;
  }
}
