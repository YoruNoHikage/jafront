import React, { Component } from "react";
import { Link } from "react-router";

export default class MenuItem extends Component {
  render() {
    var { name, icon } = this.props;
    return (
      <li>
          <Link to={this.props.to || '#'}>
              <i className={"fa fa-fw fa-" + icon}></i>
              <span>{name}</span>
          </Link>
      </li>
    );
  }
}
