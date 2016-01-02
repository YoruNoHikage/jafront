import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestRegistration } from '../actions/auth';

import RegisterForm from '../components/RegisterForm';
import ExternalLogin from '../components/ExternalLogin';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.user != null,
    router: state.router,
  };
}

class LogPage extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const {
      ['register-username']: {value: username},
      ['register-email']: {value: email},
      ['register-password']: {value: password},
    } = e.target;

    this.props.dispatch(requestRegistration(username, email, password));
  }

  componentWillMount() {
    const { isAuthenticated, history, router } = this.props;
    if(isAuthenticated) {
      const path = router.location.query.return || '/';
      history.push(path);
    }
  }

  render() {
    return (
      <div className="container">

          <header>
            <h2>S'inscrire</h2>
          </header>

          <div className="layout layout--center">
            <div className="layout__item u-1/2 layout layout--middle">
              <div className="panel">
                <RegisterForm onSubmit={this.handleSubmit.bind(this)} className="layout__item u-1/2" />
                <ExternalLogin className="layout__item layout--center u-1/2" />
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(LogPage);
