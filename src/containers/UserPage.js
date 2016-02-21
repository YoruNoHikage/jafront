import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import Well from '../components/Well';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import EditableTags from '../components/EditableTags';

function mapStateToProps(state, ownProps) {
  const { auth, entities } = state;
  const { username } = ownProps.params;
  const { games, technologies, users } = entities;
  const currentUser = users[auth.user] || {};

  // getting user if it exists in entities
  let user = users[username] || {};
  if(user) {
    user = {
      ...user,
      technologies: user.technologies.map(slug => technologies[slug]),
      games: user.games.map(name => games[name]),
      watchedGames: user.watchedGames.map(name => games[name]),
      technologies: user.technologies.map(name => technologies[name]),
    };
  }

  return {
    username,
    user,
    isCurrentUser: user.username === currentUser.username,
    // followedByUser: user.followers.indexOf(currentUser.username) > -1,
    // followingUser: user.following.indexOf(currentUser.username) > -1,
  };
}

@connect(mapStateToProps)
export default class UserPage extends Component {
  render() {
    const { user, isCurrentUser, followedByUser, followingUser } = this.props;
    if(!user) {
      return (<div>Loading...</div>);
    }

    let games = user.games.map((game) => (
      <li className='layout__item u-1/3-deskhd u-1/2-desk' key={game.slug}>
        <Card>
          <div className="header">
            <h3>
              <Link to={`/games/${game.slug}`}>
                <img src={game.logo} />
                <span>{game.name}</span>
              </Link>
            </h3>
          </div>
          <div className="content" style={{margin: 0, paddingBottom: 0}}>
            {game.description}
          </div>
        </Card>
      </li>
    ));

    // const badgeStyle = {
    //   color: 'white',
    //   background: 'rgba(0,0,0,0.25)',
    //   margin: '5px',
    //   padding: '2px 5px',
    //   borderRadius: '5px',
    //   textTransform: 'uppercase',
    //   fontSize: '.8rem',
    //   fontWeight: '600',
    // };

    return (
      <div>
        <header style={{background: '#2c2c2c'}}>
          <div className="container">
            <div className="layout layout--bottom">
              <div className="layout__item u-2/3-deskhd u-2/3-desk u-2/3-lap">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{flex: '1', display: 'flex', alignItems: 'center'}}>
                    <h2 style={{color: 'white'}}>{user.username}</h2>
                    {/*followingUser ? <span style={badgeStyle}>Follows you</span> : null*/}
                  </div>
                </div>
              </div>
              <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
                <div style={{padding: '0.5em'}}>
                  <div style={{margin: 'auto', position: 'relative', width: '200px', height: '200px'}}>
                    <div style={{
                      background: `url(${user.avatar}) no-repeat center center / cover`,
                      width: '200px', height: '200px',
                      borderRadius: '50%',
                      border: '.188em solid #fff'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="layout layout--rev">

            <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
              <aside style={{padding: '0.5em 0'}}>
                <Card>
                  <p>{user.bio}</p>
                  <div className="content">
                    <ul className="list">
                      <li>
                        <div className="type">
                          <span className="fa fa-fw fa-code"></span>
                          Techs
                        </div>
                        <div>
                          <EditableTags
                            tags={user.technologies}
                            isEditing={false}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-fw fa-map-marker"></span>
                          Location
                        </div>
                        <div>{user.location}</div>
                      </li>
                    </ul>
                  </div>

                  {/*<div style={{textAlign: 'center'}}>
                    <IconButton icon="eye" iconActive="eye-slash" size="large" active={followedByUser} />
                  </div>*/}
                </Card>
              </aside>
            </div>

            <div className="layout__item u-2/3-deskhd u-2/3-desk u-2/3-lap">
              {games.length > 0 ?
                <ul className='layout layout--small' style={{padding: '0.5em 0'}}>
                  {games}
                </ul>
                :
                <Well>{user.username} didn't publish any game for now.</Well>
              }
            </div>

          </div>
        </div>

      </div>
    );
  }
}
