import fetchMock from 'fetch-mock';
import slug from 'slug';

const API_ROOT = 'http://localhost:8000/';

let technologyPlaceholder = {name: 'SFML', slug: 'sfml'};
let gamePlaceholder = {
  name: 'Awesome game',
  slug: 'awesome-game',
  description: 'This is my super duper game about cookies',
  owner: {
    username: 'YoruNoHikage',
  },
  watchers: [],
  technologies: [
    technologyPlaceholder,
    {name: "C++", slug: "cpp"},
  ],
};
let userPlaceholder = {
  username: 'YoruNoHikage',
  username_canonical: 'yorunohikage',
  games: [{slug: 'awesome-game'}],
  watched_games: [],
  following: [],
  followers: [],
};

function buildUrl(endpoint) {
  endpoint = endpoint.source || endpoint;
  return new RegExp(API_ROOT + endpoint + /\?/.source + '_api=true&_format=json');
}

// Games
fetchMock.mock(buildUrl('games'), 'GET', [
  {...gamePlaceholder, slug: 'test', name: 'Test', description: 'Test ololol kikou game want to play.'},
  {...gamePlaceholder, slug: 'test-2', name: 'Test 2', description: 'oh not again, this is the second version.'},
]);

fetchMock.mock(buildUrl('games'), 'POST', (url, opts) => {
  const { name, description } = JSON.parse(opts.body);
  return {
    ...gamePlaceholder,
    slug: slug(name),
    name,
    description,
  };
});

fetchMock.mock(buildUrl(/games\/(.+)/), 'GET', (url, opts) => {
  const slug = /games\/(.*)+\?/gm.exec(url)[1];
  return {
    ...gamePlaceholder,
    slug,
    name: `Name of ${slug}`,
  };
});

// Users
fetchMock.mock(buildUrl('users'), 'GET', [
  {...userPlaceholder, username: 'Jean-Michel'},
  {...userPlaceholder, username: 'YoruNoHikage'},
]);

fetchMock.mock(buildUrl(/users\/(.+)/), 'GET', (url, opts) => {
  const username = /users\/(.+)\?/gm.exec(url)[1];
  return {
    ...userPlaceholder,
    username,
  };
});

// Authenticated User
fetchMock.mock(buildUrl(/user\/favorites\/(.+)/), 'PUT', (url, opts) => {
  const slug = /user\/favorites\/(.+)\?/gm.exec(url)[1];
  return {
    username: 'YoruNoHikage',
    watchedGames: [{
      slug,
      watchers: [{username: 'YoruNoHikage'}],
    }]
  };
});
fetchMock.mock(buildUrl(/user\/favorites\/(.+)/), 'DELETE', (url, opts) => {
  const slug = /user\/favorites\/(.+)\?/gm.exec(url)[1];
  return {
    username: 'YoruNoHikage',
    watchedGames: [{
      slug,
      watchers: [],
    }],
  };
});