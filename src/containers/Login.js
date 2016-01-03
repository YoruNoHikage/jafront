import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestLogin } from '../actions/auth';

import LogPage from './LogPage';
import LoginForm from '../components/LoginForm';

@connect()
export default class Login extends Component {
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
