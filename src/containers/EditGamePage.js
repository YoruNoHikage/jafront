import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

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

function mapStateToProps(state) {
  const { edited, isLoading, slug } = state.games.edit;
  return {
    edited,
    isLoading,
    slug,
  }
}

@connect(mapStateToProps)
export default class EditGamePage extends Component {
  componentWillReceiveProps({ edited, slug, dispatch }) {
    if(edited) {
      dispatch(routeActions.push(`/games/${slug}`));
    }
  }

  render() {
    const { ...rest } = this.props;

    return <GamePage {...rest} isEditing={true} onChangeTitle={onChangeTitle} onDropLogo={onDropLogo} />;
  }
}

export default EditGamePage;
