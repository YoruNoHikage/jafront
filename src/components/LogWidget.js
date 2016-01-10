import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

import { requestRegistration, requestLogin } from '../actions/auth';

import Modal from './Modal';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Avatar from './Avatar';
import ExternalLogin from './ExternalLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from '../../css/logbox.css';

@connect(({ routing }) => ({path: routing.path}))
export default class LogWidget extends Component {
  render() {
    const endPath = this.props.path !== '/' ? `?returnTo=${this.props.path}` : '';

    return (
      <div className={styles.default + " user"}>
        <Avatar />
        <div className={styles.absoluteContainer}>
          <div className={styles.tableContainer}>
            <ButtonGroup className={styles.logButtons}>
              <Button onClick={() => this.props.dispatch(pushPath(`/login${endPath}`, {modal: true}))} type="negative">Connexion</Button>
              <Button onClick={() => this.props.dispatch(pushPath(`/register${endPath}`, {modal: true}))} type="negative">Inscription</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
