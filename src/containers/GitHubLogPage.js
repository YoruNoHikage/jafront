import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authGitHub, checkUsername } from '../actions/auth';

import AutocheckInputText from '../components/AutocheckInputText';
import Button from '../components/Button';

function mapStateToProps(state) {
  return {
    code: state.router.location.query.code,
    isLoading: state.auth.github.isLoading,
    user: state.auth.github.user,
    username: state.auth.username,
  };
}

@connect(mapStateToProps)
export default class GitHubLogPage extends Component {
  componentDidMount() {
    if(!this.props.isLoading) {
      this.props.dispatch(authGitHub(this.props.code));
    }
  }

  componentWillReceiveProps(props) {
    if(props.user && props.user.username) {
      props.history.pushState(null, props.location.query.redirect || '/');
    }
  }

  handleSubmit(e) {
    if(this.props.username.status === 'success') {
      this.props.dispatch(authGitHub(this.props.code, this.props.username.value));
    } else {
      alert('Username is taken, I said !');
    }
  }

  render() {
    let body;
    if(!this.props.isLoading) {
      body = (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p>Your GitHub username is already taken here, we're sorry.</p>
          <label htmlFor="register-github-username">New username</label>
          <AutocheckInputText
            status={this.props.username.status} asyncFunction={(username) => {this.props.dispatch(checkUsername(username))}}
            id="register-github-username" name="register-github-username" placeholder="JohnSmith" />
          <Button>Submit</Button>
        </form>
      );
    } else {
       body = "Loading...";
    }

    return (
      <div className="container">
        <div className="panel">
          {body}
        </div>
      </div>
    );
  }
}
