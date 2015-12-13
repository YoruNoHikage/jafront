import React, { Component } from 'react';
import { connect } from 'react-redux';

import createHistory from 'history/lib/createBrowserHistory';

import { checkRegistration, checkLogin } from '../actions/auth';

import Modal from './Modal';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Avatar from './Avatar';
import ExternalLogin from './ExternalLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from '../../css/logbox.css';

function mapStateToProps(state) {
  const { pathname, search } = state.router.location;
  return {
    location: pathname + search,
  };
}

@connect(mapStateToProps)
export default class LogWidget extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      isRegister: false,
      location: '',
    };
  }

  openModal(isRegister) {
    this.setState({
      modalIsOpen: true,
      isRegister,
      location: this.props.location,
    });
    createHistory().replace(null, isRegister ? '/register' : '/login'); // TODO: proper way
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    createHistory().replace(null, this.state.location); // TODO: proper way
  }

  handleRegistration(e) {
    e.preventDefault();
    const {
      ['register-username']: {value: username},
      ['register-email']: {value: email},
      ['register-password']: {value: password},
    } = e.target;

    this.props.dispatch(checkRegistration(username, email, password));
  }

  handleLogin(e) {
    e.preventDefault();
    const {
      ['login-username']: {value: username},
      ['login-password']: {value: password},
    } = e.target;

    this.props.dispatch(checkLogin(username, password));
  }

  render() {
    let modalForm;
    if(this.state.isRegister) {
      modalForm = <RegisterForm onSubmit={this.handleRegistration.bind(this)} className="layout__item u-1/2" />;
    } else {
      modalForm = <LoginForm onSubmit={this.handleLogin.bind(this)} className="layout__item u-1/2" />;
    }

    return (
      <div className={styles.default + " user"}>
        <Avatar />
        <div className={styles.absoluteContainer}>
          <div className={styles.tableContainer}>
            <ButtonGroup className={styles.logButtons}>
              <Button type="negative" onClick={this.openModal.bind(this, false)}>Connexion</Button>
              <Button type="negative" onClick={this.openModal.bind(this, true)}>Inscription</Button>
            </ButtonGroup>
          </div>
        </div>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}>
          <h2>{this.state.isRegister ? "S'inscrire" : "Se connecter"}</h2>
          <div className="layout layout--middle">
            {modalForm}
            <ExternalLogin className="layout__item layout--center u-1/2" />
          </div>
        </Modal>
      </div>
    );
  }
}
