import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from "react-redux";

import Avatar from "./Avatar.js";
import LogWidget from "./LogWidget.js";
import UserWidget from "./UserWidget.js";

import Menu from "./navigation/Menu";
import MenuItem from "./navigation/MenuItem";

// @connect(state => ({ user: state.auth.user }))
@connect(state => state)
export default class Navigation extends Component {
  render() {
    let widget;
    if(this.props.auth.user) {
      widget = <UserWidget />;
    } else {
      widget = <LogWidget />;
    };

    return (
      <nav role="navigation" id="sidebar">
        <h1 className="logo">
          <Link to="/">JeuxAmateurs</Link>
        </h1>
        {widget}

        <Menu>
          <MenuItem name="Games" icon="gamepad" to="/games" />
          <MenuItem name="Actualités" icon="newspaper-o" />
          <MenuItem name="Tests" icon="bullhorn" />
          <MenuItem name="Vidéos" icon="play-circle" />
          <MenuItem name="Salon" icon="users" />
        </Menu>
      </nav>
    );
  }
}
