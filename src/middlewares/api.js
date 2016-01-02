import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import '../mockApi';

const userSchema = new Schema('users', {
  idAttribute: 'username',
});

const gameSchema = new Schema('games', {
  idAttribute: 'slug',
});

const technologySchema = new Schema('technologies', {
  idAttribute: 'slug',
});

userSchema.define({
  games: arrayOf(gameSchema),
  watchedGames: arrayOf(gameSchema),

  followers: arrayOf(userSchema),
  following: arrayOf(userSchema),
});

gameSchema.define({
  owner: userSchema,
  watchers: arrayOf(userSchema),

  technologies: arrayOf(technologySchema),
});

technologySchema.define({
  games: arrayOf(gameSchema),
});

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  GAME: gameSchema,
  GAME_ARRAY: arrayOf(gameSchema),
  TECHNOLOGY: technologySchema,
  TECHNOLOGY_ARRAY: arrayOf(technologySchema),
};

export const CALL_API = 'JA_API_CALL';

export const API_ROOT = 'http://localhost:8000/';

async function callApi(method = 'GET', endpoint, payload, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  let opts = { method };
  if(method != 'GET' && payload) {
    opts.mode = 'cors';
    opts.body = JSON.stringify(payload);
    opts.headers = {
      "Authorization": 'Basic ' + btoa("Jean-Michel:password"),
      'Accept': 'application/json',
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(fullUrl, opts);
  const json = await response.json();
  if(!response.ok) {
    return Promise.reject(json);
  }

  //if(response.status === 204) {
  //  // do something for PUT/DELETE resources
  //}

  const camelizedJson = camelizeKeys(json);
  // const nextPageUrl = getNextPageUrl(response) || undefined;

  return {
    ...normalize(camelizedJson, schema),
    // nextPageUrl,
  };
}

export const api = store => next => async action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { method = 'GET', schema, types, payload } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = function(data) {
    const finalAction = {
      ...action,
      ...data,
    };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({
    type: requestType,
    payload,
  }));

  try {
    const response = await callApi(method, endpoint, payload, schema);
    next(actionWith({
      request: {
        endpoint,
        method,
        payload,
      },
      response,
      type: successType,
    }));
  } catch(error) {
    next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }));
  }
};
