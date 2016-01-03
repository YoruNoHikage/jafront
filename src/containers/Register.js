import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestRegistration } from '../actions/auth';

import LogPage from './LogPage';
import RegisterForm from '../components/RegisterForm';

@connect()
export default class Register extends Component {
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
