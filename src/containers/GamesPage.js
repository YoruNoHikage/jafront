import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGames } from '../actions/game';

import GameList from "../components/GameList.js";

const gamesSelector = (state) => Object.values(state.entities.games);
const isLoadingSelector = (state) => !!state.games.games.loadingList;

function mapStateToProps(state) {
  return {
    games: gamesSelector(state),
    isLoading: isLoadingSelector(state),
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
