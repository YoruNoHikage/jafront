import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <a href="#" onClick={() => {document.getElementById('sidebar').classList.toggle('active')}}><i className="fa fa-bars"></i></a>
            <h1 className="logo">JeuxAmateurs</h1>
            <a href="#"><i className="fa fa-arrow-up"></i></a>
        </div>
        <div role="main" id="content">
          <section className="main-content">
            {isModal ?
              this.previousChildren :
              this.props.children
            }

            {isModal && (
              <Modal isOpen={true} onRequestClose={() => this.props.history.push(location.state.returnTo || '/')}>
                {this.props.children}
              </Modal>
            )}
          </section>
        </div>
      </div>
    );
  }
}
