import { Schema, arrayOf, normalize } from 'normalizr';

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

const API_ROOT = 'http://dev.jeuxamateurs.fr/';

let technologyPlaceholder = {};
let gamePlaceholder = {};
let userPlaceholder = {};

technologyPlaceholder= {name: 'SFML', slug: 'sfml'};

gamePlaceholder = {
  name: 'Awesome game',
  slug: 'awesome-game',
  owner: userPlaceholder,
  watchers: [],
  technologies: [
    technologyPlaceholder,
    {name: "C++", slug: "cpp"},
  ],
}

userPlaceholder = {
  username: 'YoruNoHikage',
  usernameCanonical: 'yorunohikage',
  games: [gamePlaceholder],
  watchedGames: [],
  following: [],
  followers: [],
};

async function callApi(method, endpoint, payload = {}, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  // const response = await fetch(fullUrl);
  const response = await new Promise(function(resolve, reject) {
    setTimeout(resolve, 3000, () => {
      if(endpoint.startsWith('games')) {
        if(endpoint === 'games') {
          return [
            {...gamePlaceholder, slug: 'test', name: 'Test'},
            {...gamePlaceholder, slug: 'test-2', name: 'Test 2'},
          ];
        }
        let slug = /games\/(.*)+/gm.exec(endpoint)[1];
        if(slug === 'new') { slug = 'new-game'; }
        return {
          ...gamePlaceholder,
          slug,
          name: `Name of ${slug}`,
        };
      } else if(endpoint.startsWith('users')) {
        if(endpoint === 'users') {
          return [
            {...userPlaceholder, username: 'Jean-Michel'},
            {...userPlaceholder, username: 'YoruNoHikage'},
          ];
        }
        const username = /users\/(.*)+/gm.exec(endpoint)[1];
        return {
          ...userPlaceholder,
          username,
        };
      } else if(endpoint.startsWith('user/favorites')) {
        const slug = /user\/favorites\/(.*)+/gm.exec(endpoint)[1];
        if(method === 'DELETE') {
          return {
            username: 'YoruNoHikage',
            watchedGames: [{
              slug,
              watchers: [],
            }],
          };
        }
        return {
          username: 'YoruNoHikage',
          watchedGames: [{
            slug,
            watchers: [{username: 'YoruNoHikage'}],
          }]
        };
      }
      throw new Error('no placeholder');
    }());
  });
  // const json = await response.json();
  // if (!response.ok) {
  //   return Promise.reject(json);
  // }

  // const camelizedJson = camelizeKeys(json);
  const camelizedJson = response;
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
