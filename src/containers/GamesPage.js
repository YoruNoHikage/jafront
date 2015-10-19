import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGames } from '../actions/game';

import GameList from "../components/GameList.js";

function mapStateToProps(state) {
  let games = []; // TODO: change this
  for(var i in state.entities.games) {
    games.push(state.entities.games[i]);
  }

  return {
    games,
    isLoading: !!state.games.loadingList,
  };
}

@connect(mapStateToProps)
export default class GamesPage extends Component {
  componentWillMount() {
    this.props.dispatch(loadGames());
  }

  render() {
    const { games = [], isLoading } = this.props;
    return (
      <div className="container">
        <h2>Les derniers jeux ajoutés</h2>
        <GameList games={games} isLoading={isLoading} />
      </div>
    );
  }
}
