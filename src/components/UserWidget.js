import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

import IconButton from './IconButton';
import Avatar from './Avatar';

import Menu from './navigation/Menu';
import MenuItem from "./navigation/MenuItem";

@connect(({entities, auth}) => entities.users[auth.user])
export default class UserWidget extends Component {
  render() {
    const title = (
      <span>
        {this.props.username}
        <IconButton icon="sign-out" onClick={() => this.props.dispatch(logout())} />
      </span>
    );

    return (
      <div className="user">
        <Avatar title={title} src="https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=150" />
      </div>
    );
  }
}
