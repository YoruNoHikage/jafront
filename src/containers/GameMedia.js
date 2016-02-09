import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';

function mapStateToProps(state) {
  return {
    isLoading: state.games.games.loadingItem,
  };
}

@connect(mapStateToProps)
export default class GameMedia extends Component {
  render() {
    const { isLoading } = this.props;

    return (
      <div>
        <h3>Images</h3>
        <div>
          <img src="http://lorempixel.com/350/200" />
          <img src="http://lorempixel.com/350/200" />
          <img src="http://lorempixel.com/350/200" />
        </div>
        <Button><i className="fa fa-plus fa-fw"></i>Add Image</Button>
        <h3>Videos</h3>
        <div>
          <img src="http://lorempixel.com/350/200" />
          <img src="http://lorempixel.com/350/200" />
          <img src="http://lorempixel.com/350/200" />
        </div>
        <Button><i className="fa fa-plus fa-fw"></i>Add Video</Button>
      </div>
    );
  }
}
