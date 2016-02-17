import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import Navigation from '../components/Navigation';
import Modal from '../components/Modal';

@connect()
export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname !== this.props.location.pathname &&
       nextProps.location.state &&
       nextProps.location.state.modal
     ) {
      this.previousChildren = this.props.children;
    }
  }

  render() {
    const { location } = this.props;

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div>
        <Navigation />
        <div className="mobile-header">
            <a href="#" onClick={() => {document.getElementById('sidebar').classList.toggle('active')}}><span className="fa fa-bars" /></a>
            <h1 className="logo">JeuxAmateurs</h1>
            <a href="#"><span className="fa fa-arrow-up" /></a>
        </div>
        <div role="main" id="content">
          <section className="main-content">
            {isModal ?
              this.previousChildren :
              this.props.children
            }

            {isModal && (
              <Modal isOpen={true} onRequestClose={() => this.props.dispatch(routeActions.push(location.query.returnTo || '/'))}>
                {this.props.children}
              </Modal>
            )}
          </section>
        </div>
      </div>
    );
  }
}
