import React, { Component } from "react";

export default class Menu extends Component {
  render() {
    return (
      <ul>
        {this.props.children}
      </ul>
    );
  }
}
