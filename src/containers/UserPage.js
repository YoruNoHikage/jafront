import React, { Component } from 'react';

export default class UserPage extends Component {
  render() {
    return (
      <div>
        <p>User's public profile page</p>
        <ul>
            <li>Avatar / Cover</li>
            <li>Username / Name</li>
            <li>Biography</li>
            <li>Techs</li>
            <li>Games</li>
            <li>Favorites &/o owned games</li>
            <li>Contributions ?</li>
            <li>User's activity</li>
        </ul>
      </div>
    );
  }
}
