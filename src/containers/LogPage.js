import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

import { requestRegistration } from '../actions/auth';

import RegisterForm from '../components/RegisterForm';
import ExternalLogin from '../components/ExternalLogin';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.user != null,
    router: state.router,
  };
}

@connect(mapStateToProps)
export default class LogPage extends Component {
  componentWillReceiveProps({ isAuthenticated, router, dispatch }) {
    if(isAuthenticated) {
      const path = router.location.query.return || '/';
      dispatch(replaceState(null, path));
    }
  }

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
