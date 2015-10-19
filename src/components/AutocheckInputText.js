import React, { Component } from 'react';

import StatusInputText from './StatusInputText';

export default class AutocheckInputText extends Component {
  constructor() {
    super();

    this.state = {
      tickingFunctionId: 0,
    };
  }

  handleInput(e) {
    // Maybe we can improve this?
    clearTimeout(this.state.tickingFunctionId);
    this.setState({
      tickingFunctionId: setTimeout(() => {
        this.props.asyncFunction(e.target.value);
      }, this.props.delay || 500),
    });
  }

  render() {
    const { delay, asyncFunction, ...rest } = this.props;
    return (
      <StatusInputText onChange={this.handleInput.bind(this)} {...rest} />
    );
  }
}
