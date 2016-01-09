import React, { Component } from "react";
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import revalidator from 'revalidator';

import { newGame, resetNewGame } from '../actions/game';

import NewGameForm from '../components/NewGameForm';

function mapStateToProps({ games }) {
  return {
    game: games.create,
    isLoading: games.loadingNew,
  };
}

function validateNewGame(game) {
  const result = revalidator.validate(game, {
    properties: {
      name: {
        description: 'The game\'s name',
        type: 'string',
        minLength: 3,
        // required: true,
        allowEmpty: false,
        messages: {
          minLength: "Trop court (minimum : %{expected} caractères)",
          allowEmpty: "Le nom du jeu ne peut pas être vide",
          type: "Un mot est attendu",
        }
      },
      description: {
        description: 'Description of the game',
        type: 'string',
        minLength: 5,
        // required: true,
        allowEmpty: false,
        messages: {
          minLength: "Trop courte (minimum : %{expected} caractères)",
          allowEmpty: "La description ne peut pas être vide",
          type: "Une phrase est attendue",
        }
      },
    }
  });

  return result;
}

@connect(mapStateToProps)
export default class NewGamePage extends Component {

  constructor() {
    super();
    this.state = {
      fields: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      ['new-game-name']: {value: name},
      ['new-game-description']: {value: description},
    } = e.target;

    const { errors, valid } = validateNewGame({name, description});
    let fields = {};
    errors.map(({ property, message }) => {
      fields[property] = {
        error: message,
      };
    });
    // TODO: multiples errors ?

    this.setState({
      fields,
    });

    if(valid) {
      this.props.dispatch(newGame(name, description));
    }
  }

  componentWillReceiveProps({ game, isLoading, dispatch }) {
    if(game.slug) {
      dispatch(resetNewGame());
      dispatch(pushPath(`/games/${game.slug}`));
    }
  }

  render() {
    return (
      <div className="container">

        <h2 style={{textAlign: 'center'}}>Créer un nouveau projet</h2>
        <div className="layout layout--center">
          <div className="layout__item u-1/3-deskhd u-1/3-desk u-2/3-lap">
            <div className="panel">
              <NewGameForm onSubmit={this.handleSubmit.bind(this)} fields={this.state.fields} isLoading={this.props.isLoading} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}
