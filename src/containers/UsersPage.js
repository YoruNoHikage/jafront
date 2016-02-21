import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestUsers as loadUsers } from '../actions/user';

import { Link } from 'react-router';
import ButtonLink from '../components/ButtonLink';
import Well from '../components/Well';

function mapStateToProps(state) {
  const users = [];
  for(var i in state.entities.users) {
    users.push(state.entities.users[i]);
  }
  //users.sort(); by registration date

  return {
    users,
    // isLoading: !!state.games.games.loadingList,
  };
}

@connect(mapStateToProps)
export default class GamesPage extends Component {
  componentWillMount() {
    this.props.dispatch(loadUsers());
  }

  render() {
    const { users = [], isLoading } = this.props;

    const userList = users.map(({ username, avatar, location, games = [] }) => (
      <li className="layout__item u-1/4-desk u-1/2-lap" style={{marginBottom: '12px'}} key={username}>
        <div style={{display: 'flex', alignItems: 'center', background: 'white', padding: '.5em', borderRadius: '5px'}}>
          <Link to={`/users/${username}`}>
            <img style={{height: '2rem', display: 'block'}} src={avatar} alt={`${username}'s Avatar'`} />
          </Link>
          <div style={{flex: '1 1 100%', paddingLeft: '.5rem'}}>
            <Link to={`/users/${username}`}>{username}</Link>
            <div style={{fontSize: '.8rem', color: '#ddd'}}>
              {location ? `from ${location},` : null}{`${games.length} game(s)`}
            </div>
          </div>
        </div>
      </li>
    ));

    return (
      <div className="container">
        <h2>Recently joined users</h2>
        {userList.length > 0 ?
          <ul className="layout layout--small">
            {userList}
          </ul>
        :
          <Well>
            <p>
              Aucune personne n'est inscrite pour le moment. :(<br/>
              Soyez le premier !<br/>
            <ButtonLink to={{pathname: '/register', state: {modal: true}, search: `?returnTo=/users`}}><span className="fa fa-fw fa-user-plus" />Inscrivez-vous !</ButtonLink>
            </p>
          </Well>
        }
      </div>
    );
  }
}
