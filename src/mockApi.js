import fetchMock from 'fetch-mock';
import slugify from 'slug';

import usersFixtures from './fixtures/users';
import gamesFixtures from './fixtures/games';
import technologiesFixtures from './fixtures/technologies';

const API_ROOT = 'http://localhost:3000/api/';

function buildUrl(endpoint) {
  endpoint = endpoint.source || endpoint;
  return new RegExp(API_ROOT + endpoint + '$');
}

// Auth
function authResponse(url, opts) {
  const { username, email = 'jambon@patate.fr', password, code } = JSON.parse(opts.body);
  const token = code ? `oauth token ${code}` : null;
  return {
    status: username ? 200 : 400,
    body: {
      id: token || 'Basic ' + btoa(`${username}:${password}`), // loopback token
      userId: 0,
      username,
      email,
      token: token || 'Basic ' + btoa(`${username}:${password}`), // tmp
      games: [],
      watched_games: [],
      following: [],
      followers: [],
    }
  };
}

fetchMock.mock(buildUrl('register'), 'POST', authResponse);
fetchMock.mock(buildUrl('login'), 'POST', authResponse);
fetchMock.mock(buildUrl('users/login'), 'POST', authResponse);
fetchMock.mock(buildUrl('oauth'), 'POST', authResponse);

// Games
fetchMock.mock(buildUrl('games'), 'GET', gamesFixtures);

fetchMock.mock(buildUrl('games'), 'POST', (url, opts) => {
  const { name, description } = JSON.parse(opts.body);
  const slug = slugify(name);

  if(!gamesFixtures.find((game) => game.slug === slug)) {
    const newGame = {
      name,
      slug,
      description,
      logo: `http://lorempixel.com/200/200?${slugify(name)}`,
      owner: usersFixtures[0], // TODO: Authenticated user
      technologies: [],
      watchers: [],
    };
    gamesFixtures.push(newGame);
    return newGame;
  }

  return {
    status: 400,
    body: {error: `Game ${slug} already exists`},
  };
});

fetchMock.mock(buildUrl(/games\/(.+)/), 'GET', (url, opts) => {
  const slug = /games\/(((?!\?).)+)/gm.exec(url)[1];
  const game = gamesFixtures.find((game) => game.slug === slug);

  return game || {
    status: 404,
    body: {error: `Game ${slug} not found`},
  };
});

fetchMock.mock(buildUrl(/games\/(.+)/), 'PUT', (url, opts) => {
  const editedGame = JSON.parse(opts.body);
  const slug = slugify(editedGame.name || '') || /games\/(((?!\?).)+)/gm.exec(url)[1];
  let game = gamesFixtures.find((game) => game.slug === slug);

  const finalGame = {
    name,
    slug,
    description: '',
    logo: `http://lorempixel.com/200/200?${slugify(name)}`,
    owner: usersFixtures[0],
    technologies: [],
    watchers: [],
    ...game,
    ...editedGame,
  };

  if(game) {
    gamesFixtures[gamesFixtures.indexOf(game)] = finalGame;
  } else {
    gamesFixtures.push(finalGame);
  }

  return finalGame;
});

// Users
fetchMock.mock(buildUrl('users'), 'GET', usersFixtures);

fetchMock.mock(buildUrl(/users\/(.+)/), 'GET', (url, opts) => {
  const username = /users\/(((?!\?).)+)/gm.exec(url)[1];
  const user = usersFixtures.find((user) => user.username === username);

  return user || {
    status: 404,
    body: {error: `User ${username} not found`},
  };
});

// Authenticated User
fetchMock.mock(buildUrl(/user\/favorites\/(.+)/), 'PUT', (url, opts) => {
  const slug = /user\/favorites\/(((?!\?).)+)/gm.exec(url)[1];
  return {
    username: 'YoruNoHikage',
    watchedGames: [{
      slug,
      watchers: [{username: 'YoruNoHikage'}],
    }]
  };
});
fetchMock.mock(buildUrl(/user\/favorites\/(.+)/), 'DELETE', (url, opts) => {
  const slug = /user\/favorites\/(((?!\?).)+)/gm.exec(url)[1];
  return {
    username: 'YoruNoHikage',
    watchedGames: [{
      slug,
      watchers: [],
    }],
  };
});
