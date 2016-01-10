import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

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
  componentWillReceiveProps({ edited, dispatch }) {
    if(edited) {
      dispatch(pushPath(`/games/${nextProps.slug}`));
    }
  }

  render() {
    const { ...rest } = this.props;

    return <GamePage {...rest} isEditing={true} onChangeTitle={onChangeTitle} onDropLogo={onDropLogo} />;
  }
}

export default EditGamePage;
