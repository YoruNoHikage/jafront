import React, { Component } from "react";

import Navigation from "./Navigation";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="mobile-header">
            <a href="#" onClick={() => {document.getElementById('sidebar').classList.toggle('active')}}><span className="fa fa-bars" /></a>
            <h1 className="logo">JeuxAmateurs</h1>
            <a href="#"><span className="fa fa-arrow-up" /></a>
        </div>
      </div>
    );
  }
}
