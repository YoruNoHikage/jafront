import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';

class LogPage extends Component {
  handleSubmit(e) {
    e.preventDefault();
    dispatch();
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
                {/*<RegisterForm onSubmit={this.handleSubmit.bind(this)} />*/}
              </div>
            </div>
          </div>

      </div>
    );
  }
}

function select(state) {
  return {
    // games: state.user,
  };
}

export default connect(select)(LogPage)
