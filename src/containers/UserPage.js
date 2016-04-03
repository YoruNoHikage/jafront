import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestUser as loadUser } from '../actions/user';

import { denormalize } from 'denormalizr';
import { Schemas } from '../middlewares/api';

import responsiveImgStyles from '../../css/responsive-img.css';

import { Link } from 'react-router';
import Well from '../components/Well';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import EditableTags from '../components/EditableTags';
import Cover from '../components/Cover';

const userSelector = (state, username) => {
  const user = state.entities.users[username];
  if(!user) { return null; }
  return denormalize(user, state.entities, Schemas.USER);
};

function mapStateToProps(state, ownProps) {
  const { auth, entities } = state;
  const { username } = ownProps.params;
  const { games, technologies, users } = entities;
  const currentUser = users[auth.user] || {};
  const user = userSelector(state, username);

  return {
    username,
    user,
    isCurrentUser: (user && user.username) === currentUser.username,
    // followedByUser: user.followers.indexOf(currentUser.username) > -1,
    // followingUser: user.following.indexOf(currentUser.username) > -1,
  };
}

@connect(mapStateToProps)
export default class UserPage extends Component {
  componentWillMount() {
    this.props.dispatch(loadUser(this.props.username));
  }

  render() {
    const { user, isCurrentUser, followedByUser, followingUser } = this.props;
    if(!user) {
      return (<div>Loading...</div>);
    }

    let games = user.games.map((game) => (
      <li className='layout__item u-1/3-deskhd u-1/2-desk' key={game.slug}>
        <Card>
          <div className="header">
            <h3 className={responsiveImgStyles.parent}>
              <Link to={`/games/${game.slug}`} className={responsiveImgStyles.child}>
                <img src={game.logo} style={{height: '100%', objectFit: 'cover'}} />
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
        <Cover src={user ? user.cover : ''}>
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
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Cover>

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
                <div className="panel" style={{margin: '.5em 0'}}>
                  <Well>
                    <span style={{color: '#ccc', display: 'block'}} className="fa fa-frown-o fa-5x" />
                    {user.username} didn't publish any game for now.
                  </Well>
                </div>
              }
            </div>

          </div>
        </div>

      </div>
    );
  }
}
