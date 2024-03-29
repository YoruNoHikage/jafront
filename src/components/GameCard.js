import React from 'react';

import responsiveImgStyles from '../../css/responsive-img.css';

import { Link } from "react-router";
import Button from './Button';
import Card from "./Card";

const GameCard = ({ game }) => (
  <Card>
    <div className="header">
      <h3 className={responsiveImgStyles.parent}>
        <Link to={`/games/${game.slug}`} className={responsiveImgStyles.child}>
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
