export const yoruNoHikageSubset = {
  "id": 0,
  "username": "YoruNoHikage",
  "email": "yorunohikage@test.fr",
  "avatar": "http://img2-ak.lst.fm/i/u/avatar170s/8e0e9ed34ffd40fbc03bb7b0a200a857.png",
  "bio": "Hello guys, I'm a shitty developer from Rennes, France. I'm also in Brest, but it's lame.",
  "location": "Rennes",
  "technologies": ["sfml", "cpp"],
  "games": ["awesome-game"],
  "watched_games": ["awesome-game", "test"],
  "following": [],
  "followers": ["Jean-Michel"]
};

export const jeanMichelSubset = {
  "id": 1,
  "username": "Jean-Michel",
  "email": "jean-michel@test.fr",
  "avatar": "https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg",
  "bio": "Grumpf.",
  "location": "",
  "technologies": ["cpp"],
  "games": ["test"],
  "watched_games": ["awesome-game"],
  "following": ["YoruNoHikage"],
  "followers": []
};

const { awesomeGameSubset, testSubset } = require('./games');

const users = [{
  ...yoruNoHikageSubset,
  "technologies": [{
    "name": "SFML",
    "slug": "sfml"
  }, {
    "name": "C++",
    "slug": "cpp"
  }],
  "games": [awesomeGameSubset],
  "watched_games": [awesomeGameSubset, testSubset],
  "following": [],
  "followers": [jeanMichelSubset]
}, {
  ...jeanMichelSubset,
  "technologies": [{
    "name": "C++",
    "slug": "cpp"
  }],
  "games": [testSubset],
  "watched_games": [awesomeGameSubset],
  "following": [yoruNoHikageSubset],
  "followers": []
}];

export default users;
