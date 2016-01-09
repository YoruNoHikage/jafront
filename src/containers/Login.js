import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replacePath } from 'redux-simple-router';

import { requestLogin } from '../actions/auth';

import LogPage from './LogPage';
import LoginForm from '../components/LoginForm';

@connect(({ auth }) => ({isAuthenticated: !!auth.user}))
export default class Login extends Component {
  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth({ isAuthenticated, location, dispatch }) {
    if(isAuthenticated) {
      dispatch(replacePath(location.query.return || '/'));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      ['login-username']: {value: username},
      ['login-password']: {value: password},
    } = e.target;

    this.props.dispatch(requestLogin(username, password));
  }

  render() {
    const { location } = this.props;
    const modal = location.state ? (location.state.modal || false) : false;

    return (
      <LogPage isModal={modal} title="Se connecter">
        <LoginForm onSubmit={this.handleSubmit.bind(this)} className="layout__item u-1/2" />
      </LogPage>
    );
  }
}
