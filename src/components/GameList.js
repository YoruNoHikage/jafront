import React from "react";
import { Link } from "react-router";

import load from './load';

import Button from './Button';
import Card from "./Card";
import Well from "./Well";

const GameList = (props) => {
  const games = props.games.map((game, i) =>
    <li className="layout__item u-1/4-deskhd u-1/3-desk u-1/2-lap" key={i}>
      <Card>
        <div className="header">
            <h3>
                <Link to={`/games/${game.slug}`}>
                    <img src={"http://lorempixel.com/200/200?" + i} />
                    <span>{game.name}</span>
                </Link>
            </h3>
        </div>
        <div className="content">
            {game.description}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <a href="#" style={{flex: '1'}}>
                <span className="fa fa-user"></span>
                &nbsp;Owner
            </a>
            <Button>Follow</Button>
        </div>
      </Card>
    </li>
  );

  if(games.length) {
    return (
      <div>
        <ul className="layout layout--medium">
          {games}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <Well>
          <p>
            Aucun jeu pour le moment.<br/>
            Ajoutez le vôtre rapidement !<br/>
            <Button href="/register">S'inscrire</Button>
          </p>
        </Well>
      </div>
    );
  }
};

export default load(GameList);
