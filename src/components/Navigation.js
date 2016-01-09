import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import StickySidebar from './StickySidebar';
import Avatar from './Avatar';
import LogWidget from './LogWidget';
import UserWidget from './UserWidget';

import Menu from './navigation/Menu';
import MenuItem from './navigation/MenuItem';

@connect(state => ({ isAuthenticated: !!state.auth.user }))
export default class Navigation extends Component {
  render() {
    let widget;
    if(this.props.isAuthenticated) {
      widget = <UserWidget />;
    } else {
      widget = <LogWidget />;
    };

    return (
      <StickySidebar>
        <h1 className="logo">
          <Link style={{color: 'transparent'}} to="/">JeuxAmateurs</Link>
        </h1>
        {widget}

        <Menu>
          <MenuItem icon="gamepad" to="/games">Games</MenuItem>
          {/*<MenuItem icon="newspaper-o">News</MenuItem>
          <MenuItem icon="bullhorn">Tests</MenuItem>
          <MenuItem icon="play-circle">Vidéos</MenuItem>
          <MenuItem icon="users">Salon</MenuItem>*/}
        </Menu>
      </StickySidebar>
    );
  }
}
