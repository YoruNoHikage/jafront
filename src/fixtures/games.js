const games = [{ // small subset of games
  "name": "Awesome game",
  "slug": "awesome-game",
  "logo": "http://lorempixel.com/200/200?awesome-game",
  "description": "This is my super duper game about cookies",
  "about": "Awesome Game : *Deep in your mind*\nThink of it like a huge trick !\n\n![Some picture](https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg)",
  "owner": {
    "id": 0,
    "username": "YoruNoHikage",
    "email": "yorunohikage@test.fr",
    "avatar": "http://img2-ak.lst.fm/i/u/avatar170s/8e0e9ed34ffd40fbc03bb7b0a200a857.png",
    "technologies": ["sfml", "cpp"],
    "games": ["awesome-game"],
    "watched_games": ["awesome-game", "test"],
    "following": [],
    "followers": ["Jean-Michel"]
  },
  "technologies": [{
    "name": "SFML",
    "slug": "sfml"
  }, {
    "name": "C++",
    "slug": "cpp"
  }],
  "watchers": [{
    "id": 0,
    "username": "YoruNoHikage",
    "email": "yorunohikage@test.fr",
    "avatar": "http://img2-ak.lst.fm/i/u/avatar170s/8e0e9ed34ffd40fbc03bb7b0a200a857.png",
    "games": ["awesome-game"]
  },{
    "id": 1,
    "username": "Jean-Michel",
    "email": "jean-michel@test.fr",
    "avatar": "https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg",
    "games": ["test"],
    "watched_games": ["awesome-game"],
  }]
}, {
  "name": "Test",
  "slug": "test",
  "logo": "http://lorempixel.com/200/200?test",
  "description": "This is my super duper game about test",
  "owner": {
    "id": 1,
    "username": "Jean-Michel",
    "email": "jean-michel@test.fr",
    "avatar": "https://pbs.twimg.com/profile_images/559360371593465857/TW4FQVeq.jpeg",
    "technologies": ["cpp"],
    "games": ["test"],
    "watched_games": ["awesome-game"],
    "following": ["YoruNoHikage"],
    "followers": []
  },
  "technologies": [{
    "name": "C++",
    "slug": "cpp"
  }],
  "watchers": [{
    "id": 0,
    "username": "YoruNoHikage",
    "email": "yorunohikage@test.fr",
    "avatar": "http://img2-ak.lst.fm/i/u/avatar170s/8e0e9ed34ffd40fbc03bb7b0a200a857.png",
    "games": ["awesome-game"]
  }]
}];

export default games;
