import React from "react";

import load from '../components/load';
import Button from '../components/Button';

const NewGameForm = ({ onSubmit, fields }) => {
  return (
    <form onSubmit={onSubmit} method="post">
      <div className="form-group">
        <label htmlFor="new-game-name">Nom de jeu</label>
        <input id="new-game-name" name="new-game-name" className="form-input" type="text" placeholder="Grandma VS Alligator Zombies" />
        <span>{fields['name'] ? fields['name'].error : ''}</span>
      </div>

      <div className="form-group">
        <label htmlFor="new-game-description">Description</label>
        <textarea id="new-game-description" name="new-game-description" className="form-input" type="text" placeholder="Incarnez mamie et, à l'aide de votre cabas, défoncez les alligators qui veulent s'en prendre à votre porte-monnaie !" rows="5"></textarea>
        <span>{fields['description'] ? fields['description'].error : ''}</span>
      </div>

      <Button size="large">C'est parti !</Button>
    </form>
  );
};

export default load(NewGameForm);
