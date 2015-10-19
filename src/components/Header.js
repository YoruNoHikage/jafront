import React, { Component } from "react";

import Navigation from "./Navigation";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="mobile-header">
            <a href="#" onClick={() => {document.getElementById('sidebar').classList.toggle('active')}}><i className="fa fa-bars"></i></a>
            <h1 className="logo">JeuxAmateurs</h1>
            <a href="#"><i className="fa fa-arrow-up"></i></a>
        </div>
      </div>
    );
  }
}
