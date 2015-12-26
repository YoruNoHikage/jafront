import React, { Component } from 'react';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div style={{lineHeight: 1, width: '100%', textAlign: 'center', color: '#ccc', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p>
          <span style={{fontSize: '10rem', fontWeight: '600'}}>404</span><br/>
          <span style={{fontSize: '1.562rem', fontWeight: '100'}}>There is no poney here.</span>
        </p>
      </div>
    );
  }
}
