import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from './Avatar';

import Menu from './navigation/Menu';
import MenuItem from "./navigation/MenuItem";

@connect(state => state.auth.user)
export default class UserWidget extends Component {
  render() {
    return (
      <div className="user">
        <Avatar title={this.props.username} src="https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=150" />
        <Menu>
          <MenuItem name="Profil" icon="user" />
          <MenuItem name="Projets" icon="rocket" />
        </Menu>
      </div>
    );
  }
}
