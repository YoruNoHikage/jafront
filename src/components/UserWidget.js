import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

import IconButton from './IconButton';
import Avatar from './Avatar';

import Menu from './navigation/Menu';
import MenuItem from "./navigation/MenuItem";

@connect(state => state.auth.user)
export default class UserWidget extends Component {
  render() {
    return (
      <div className="user">
        <Avatar title={this.props.username} src="https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=150" />
        <IconButton icon="sign-out" onClick={() => this.props.dispatch(logout())} />
        <Menu>
          <MenuItem icon="user">Profil</MenuItem>
          <MenuItem icon="rocket">Projets</MenuItem>
        </Menu>
      </div>
    );
  }
}
