import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

import GamePage from './GamePage';

function onChangeTitle(newTitle) {
  return {
    title: newTitle,
  };
}

function onDropLogo(files) {
  let logo = '';
  files.forEach((file) => {
    logo = file.preview;
  });
  return logo;
}

const isAuthorSelector = (game, user) => game && user ? game.owner === user.username : false;

function mapStateToProps(state, ownProps) {
  const { edited, isLoading, slug = ownProps.params.slug } = state.games.edit;
  const game = state.entities.games[slug];
  const currentUser = state.entities.users[state.auth.user] || {};
  return {
    game,
    isAuthor: isAuthorSelector(game, currentUser),
    edited,
    isLoading,
    slug,
  }
}

@connect(mapStateToProps)
export default class EditGamePage extends Component {
  componentWillReceiveProps({ game, isAuthor, edited, slug, dispatch }) {
    if(edited || !isAuthor) {
      history.push(`/games/${slug}`);
    }
  }

  render() {
    const { ...rest } = this.props;

    return <GamePage {...rest} isEditing={true} onChangeTitle={onChangeTitle} onDropLogo={onDropLogo} />;
  }
}

export default EditGamePage;
