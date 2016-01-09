import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

import { checkUsername, requestAuthGitHub } from '../actions/auth';

import AutocheckInputText from '../components/AutocheckInputText';
import Button from '../components/Button';

function mapStateToProps({ auth, entities }, ownProps) {
  return {
    isLoading: auth.github.isLoading,
    user: entities.users[auth.user],
    username: auth.username,
  };
}

@connect(mapStateToProps)
export default class GitHubLogPage extends Component {
  componentDidMount() {
    if(!this.props.isLoading) {
      this.props.dispatch(requestAuthGitHub(this.props.location.query.code));
    }
  }

  componentWillReceiveProps({ user, username, location, dispatch }) {
    if(user && user.username) {
      dispatch(pushPath(location.query.redirect || '/'));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.props.username.status === 'success') {
      this.props.dispatch(requestAuthGitHub(this.props.code, this.props.username.value));
    } else {
      alert('Username is taken, I said !');
    }

    return false;
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
