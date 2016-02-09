import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import { requestRegistration, requestLogin } from '../actions/auth';

import Modal from './Modal';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Avatar from './Avatar';
import ExternalLogin from './ExternalLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from '../../css/logbox.css';

@connect(({ routing }) => ({path: routing.location.pathname}))
export default class LogWidget extends Component {
  render() {
    const returnTo = this.props.path !== '/' || this.props.path !== '/login' || this.props.path !== '/register' ? this.props.path : '';
    const createModalTo = (pathname) => ({
      pathname,
      search: `?returnTo=${returnTo}`,
      state: {modal: true},
    });

    return (
      <div className={styles.default + " user"}>
        <Avatar />
        <div className={styles.absoluteContainer}>
          <div className={styles.tableContainer}>
            <ButtonGroup className={styles.logButtons}>
              <Button onClick={() => this.props.dispatch(routeActions.push(createModalTo('/login')))} type="negative">Connexion</Button>
              <Button onClick={() => this.props.dispatch(routeActions.push(createModalTo('/register')))} type="negative">Inscription</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
