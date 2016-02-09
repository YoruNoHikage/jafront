import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import { requestRegistration } from '../actions/auth';

import LogPage from './LogPage';
import RegisterForm from '../components/RegisterForm';

@connect(({ auth }) => ({isAuthenticated: !!auth.user}))
export default class Register extends Component {
  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth({ isAuthenticated, location, dispatch }) {
    if(isAuthenticated) {
      dispatch(routeActions.replace(location.query.returnTo || '/'));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      ['register-username']: {value: username},
      ['register-email']: {value: email},
      ['register-password']: {value: password},
    } = e.target;

    this.props.dispatch(requestRegistration(username, email, password));
  }

  render() {
    const { location } = this.props;
    const modal = location.state ? (location.state.modal || false) : false;

    return (
      <LogPage isModal={modal} title="S'inscrire">
        <RegisterForm onSubmit={this.handleSubmit.bind(this)} className="layout__item u-1/2" />
      </LogPage>
    );
  }
}
