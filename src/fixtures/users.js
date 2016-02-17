const awesomeGameSubset = {
  "name": "Awesome game",
  "slug": "awesome-game",
  "logo": "http://lorempixel.com/200/200?awesome-game",
  "description": "This is my super duper game about cookies",
  "owner": "YoruNoHikage", // TODO: change for id
  "watchers": ["YoruNoHikage", "Jean-Michel"]
};

const testSubset = {
  "name": "Test",
  "slug": "test",
  "logo": "http://lorempixel.com/200/200?test",
  "description": "This is my super duper game about test",
  "owner": "Jean-Michel", // TODO: change for id
  "watchers": ["YoruNoHikage"]
};

const yoruNoHikageSubset = {
  "id": 0,
  "username": "YoruNoHikage",
  "email": "yorunohikage@test.fr",
  "avatar": "http://img2-ak.lst.fm/i/u/avatar170s/8e0e9ed34ffd40fbc03bb7b0a200a857.png",
  "bio": "Hello guys, I'm a shitty developer from Rennes, France. I'm also in Brest, but it's lame.",
  "following": [],
  "followers": ["Jean-Michel"]
};

const jeanMichelSubset = {
  "id": 1,
  "username": "Jean-Michel",
  "email": "jean-michel@test.fr",
  "avatar": "https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg",
  "bio": "Grumpf.",
  "following": ["YoruNoHikage"],
  "followers": []
};

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
