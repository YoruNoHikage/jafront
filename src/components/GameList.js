import React from "react";

import load from './load';

import GameCard from './GameCard';
import ButtonLink from './ButtonLink';
import Well from "./Well";

const GameList = ({ games }) => {
  if(games.length) {
    return (
      <div>
        <ul className="layout layout--medium">
          {games.map((game, i) =>
            <li className="layout__item u-1/4-deskhd u-1/3-desk u-1/2-lap" key={i}>
              <GameCard game={game} />
            </li>
          )}
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
            <ButtonLink to='/games/new'><span className="fa fa-fw fa-plus" />Ajouter votre jeu</ButtonLink>
          </p>
        </Well>
      </div>
    );
  }
};

export default load(GameList);
