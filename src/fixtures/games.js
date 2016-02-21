import { yoruNoHikageSubset, jeanMichelSubset } from './users';

export const awesomeGameSubset = {
  "name": "Awesome game",
  "slug": "awesome-game",
  "logo": "http://lorempixel.com/200/200?awesome-game",
  "description": "This is my super duper game about cookies",
  "owner": "YoruNoHikage", // TODO: change for id
  "watchers": ["YoruNoHikage", "Jean-Michel"]
};

export const testSubset = {
  "name": "Test",
  "slug": "test",
  "logo": "http://lorempixel.com/200/200?test",
  "description": "This is my super duper game about test",
  "owner": "Jean-Michel", // TODO: change for id
  "watchers": ["YoruNoHikage"]
};

const games = [{
  ...awesomeGameSubset,
  "about": "Awesome Game : *Deep in your mind*\nThink of it like a huge trick !\n\n![Some picture](https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg)",
  "owner": yoruNoHikageSubset,
  "technologies": [{
    "name": "SFML",
    "slug": "sfml"
  }, {
    "name": "C++",
    "slug": "cpp"
  }],
  "watchers": [yoruNoHikageSubset, jeanMichelSubset]
}, {
  "name": "Test",
  "slug": "test",
  "logo": "http://lorempixel.com/200/200?test",
  "description": "This is my super duper game about test",
  "owner": jeanMichelSubset,
  "technologies": [{
    "name": "C++",
    "slug": "cpp"
  }],
  "watchers": [yoruNoHikageSubset]
}];

export default games;
