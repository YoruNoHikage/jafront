import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from '../actions/auth';

import IconButton from './IconButton';
import Avatar from './Avatar';

import Menu from './navigation/Menu';
import MenuItem from "./navigation/MenuItem";

@connect(({entities, auth}) => entities.users[auth.user])
export default class UserWidget extends Component {
  render() {
    const { username, avatar } = this.props;

    return (
      <div className="user">
        <Link to={`/users/${username}`}>
          <Avatar title={username} src={avatar} />
        </Link>
        <IconButton
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            right: '0px',
            margin: 'auto',
            color: 'white',
          }}
          icon="power-off"
          onClick={() => this.props.dispatch(logout())}
        />
      </div>
    );
  }
}
