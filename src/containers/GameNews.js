import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isLoading: state.games.games.loadingItem,
  };
}

@connect(mapStateToProps)
export default class GameNews extends Component {
  render() {
    const { isLoading } = this.props;

    return (
      <p>News !</p>
    );
  }
}
