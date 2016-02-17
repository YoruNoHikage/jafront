import { Schemas, CALL_API } from '../middlewares/api';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`)
  return res;
}

export const USERS = createRequestTypes('USERS');
export const USER = createRequestTypes('USER');

function action(types, payload = {}) {
  return {
    [CALL_API]: {
      types: [types.REQUEST, types.SUCCESS, types.FAILURE],
      ...payload
    }
  };
}

export function requestUsers() {
  return action(USERS, {
    endpoint: `users`,
    schema: Schemas.USER_ARRAY,
  });
}

export function requestUser(username) {
  return action(USER, {
    endpoint: `users/${username}`,
    username,
    schema: Schemas.USER,
  });
}
