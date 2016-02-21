import React from 'react';

import { Link } from "react-router";
import Button from './Button';
import Card from "./Card";

const keepAspectRatio = {
  parent: {
    display: 'block',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '100%',
    height: 0,
  },
  child: {
    position: 'absolute',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  }
};

const GameCard = ({ game }) => (
  <Card>
    <div className="header">
      <h3 style={keepAspectRatio.parent}>
        <Link to={`/games/${game.slug}`} style={keepAspectRatio.child}>
          <img src={game.logo} style={{height: '100%', objectFit: 'cover'}} />
          <span>{game.name}</span>
        </Link>
      </h3>
    </div>
    <div className="content">
      {game.description}
    </div>
    <div style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
      <Link style={{flex: '1'}} to={`/users/${game.owner}`}>
        <span className="fa fa-fw fa-user"></span>
        {game.owner}
      </Link>
      {/*<Button>
        <span className="fa fa-fw fa-user-plus"></span>
        Follow
      </Button>*/}
    </div>
  </Card>
);

export default GameCard;
