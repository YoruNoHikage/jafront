import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState, replaceState } from 'redux-router';

import createHistory from 'history/lib/createBrowserHistory';

import { checkRegistration, checkLogin } from '../actions/auth';

import Modal from './Modal';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Avatar from './Avatar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import styles from '../../css/logbox.css';

function mapStateToProps(state) {
  const { pathname, search } = state.router.location;
  return {
    auth: state.auth,
    user: state.auth.user,
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
    createHistory().replaceState(null, isRegister ? '/register' : '/login'); // TODO: proper way
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    createHistory().replaceState(null, this.state.location); // TODO: proper way
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
    const { auth, dispatch } = this.props;

    let modalForm;
    if(this.state.isRegister) {
      modalForm = <RegisterForm auth={auth} dispatch={dispatch} onSubmit={this.handleRegistration.bind(this)} />;
    } else {
      modalForm = <LoginForm auth={auth} dispatch={dispatch} onSubmit={this.handleLogin.bind(this)} />;
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

            <div className="layout__item layout--center u-1/2">
              <div className="form-group">
                <a href="https://github.com/login/oauth/authorize?client_id=164a33cf96520b3b9c15" role="button" style={{backgroundColor: '#F5F5F5', color: '#333', border: 'none', padding: '0.25rem 0.5rem'}}>
                  <i className="fa fa-fw fa-github"></i>
                  Se connecter avec GitHub
                </a>
              </div>
              <div className="form-group">
                <button type="button" style={{backgroundColor: '#55ACEE', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', opacity: '0.3'}}>
                  <i className="fa fa-fw fa-twitter"></i>
                  Se connecter avec Twitter
                </button>
              </div>
              <div className="form-group">
                <a href="#" role="button" style={{backgroundColor: '#6441A5', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', opacity: '0.3'}}>
                  <i className="fa fa-fw fa-twitch"></i>
                  Se connecter avec Twitch
                </a>
              </div>
              <div className="form-group">
                <a href="#" role="button" style={{backgroundColor: '#262627', color: '#E6E6E5', border: 'none', padding: '0.25rem 0.5rem', opacity: '0.3'}}>
                  <i className="fa fa-fw fa-steam"></i>
                  Se connecter avec Steam
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
