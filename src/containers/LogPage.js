import React, { Component } from 'react';

import ExternalLogin from '../components/ExternalLogin';

export default class LogPage extends Component {
  renderPageOrModal(isModal, content) {
    if(isModal) {
      return content;
    }

    return (
      <div className="container">
        <header>
          <h2>{this.props.title}</h2>
        </header>

        <div className="layout layout--center">
          <div className="layout__item u-1/2 layout layout--middle">
            {content}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { children, isModal } = this.props;

    return this.renderPageOrModal(isModal,
      <div className="panel">
        {children}
        <ExternalLogin className="layout__item layout--center u-1/2" />
      </div>
    );
  }
}
