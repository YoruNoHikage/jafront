import { Schemas, CALL_API } from '../middlewares/api';

export const GAMES_REQUEST = 'GAMES_REQUEST';
export const GAMES_SUCCESS = 'GAMES_SUCCESS';
export const GAMES_FAILURE = 'GAMES_FAILURE';
function requestGames() {
  return {
    [CALL_API]: {
      endpoint: `games`,
      types: [GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE],
      schema: Schemas.GAME_ARRAY,
    },
  }
}

export function loadGames() {
  return function(dispatch, getState) {
    // TODO: pagination, check if already exists
    dispatch(requestGames());
  }
}

export const GAME_REQUEST = 'GAME_REQUEST';
export const GAME_SUCCESS = 'GAME_SUCCESS';
export const GAME_FAILURE = 'GAME_FAILURE';
function requestGame(slug) {
  return {
    [CALL_API]: {
      endpoint: `games/${slug}`,
      types: [GAME_REQUEST, GAME_SUCCESS, GAME_FAILURE],
      schema: Schemas.GAME,
    },
  }
}

export function loadGame(slug) {
  return function(dispatch, getState) {
    let { games } = getState().entities;
    if(games[slug] && games[slug].full) {
      return;
    }

    dispatch(requestGame(slug));
  }
}

export const FAVORITE_GAME_REQUEST = 'FAVORITE_GAME_REQUEST';
export const FAVORITE_GAME_SUCCESS = 'FAVORITE_GAME_SUCCESS';
export const FAVORITE_GAME_FAILURE = 'FAVORITE_GAME_FAILURE';
export function favoriteGame(slug, favorited) {
  return {
    [CALL_API]: {
      method: favorited ? 'DELETE' : 'PUT',
      endpoint: `user/favorites/${slug}`,
      types: [FAVORITE_GAME_REQUEST, FAVORITE_GAME_SUCCESS, FAVORITE_GAME_FAILURE],
      schema: Schemas.USER,
    }
  };
}

export const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
export const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
export const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
export function newGame(name, description) {
  return {
    [CALL_API]: {
      endpoint: `games/new`,
      types: [NEW_GAME_REQUEST, NEW_GAME_SUCCESS, NEW_GAME_FAILURE],
      schema: Schemas.GAME,
      payload: {
        name,
        description,
      },
    },
  }
}

export const NEW_GAME_RESET = 'NEW_GAME_RESET';
export function resetNewGame() {
  return {
    type: NEW_GAME_RESET,
  };
}
