import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestRegistration, requestLogin } from '../actions/auth';

import Modal from './Modal';
import ButtonLink from './ButtonLink';
import ButtonGroup from './ButtonGroup';
import Avatar from './Avatar';
import ExternalLogin from './ExternalLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from '../../css/logbox.css';

function mapStateToProps({ routing }) {
  return {
    path: routing.locationBeforeTransitions.pathname, // TODO: change this to use React Router with context
  };
}

@connect(mapStateToProps)
export default class LogWidget extends Component {
  render() {
    const returnTo = (this.props.path !== '/' && this.props.path !== '/login' && this.props.path !== '/register') ? this.props.path : '';
    const createModalTo = (pathname) => ({
      pathname,
      search: returnTo ? `?returnTo=${returnTo}` : null,
      state: {modal: true},
    });

    return (
      <div className={styles.default + " user"}>
        <Avatar />
        <div className={styles.absoluteContainer}>
          <div className={styles.tableContainer}>
            <ButtonGroup className={styles.logButtons}>
              <ButtonLink to={createModalTo('/login')} type="negative">Connexion</ButtonLink>
              <ButtonLink to={createModalTo('/register')} type="negative">Inscription</ButtonLink>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
