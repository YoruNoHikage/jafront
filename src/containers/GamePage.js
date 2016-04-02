import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import cx from 'classnames';

import { denormalize } from 'denormalizr';
import { Schema, arrayOf } from 'normalizr';

import { loadGame, editGame, favoriteGame } from '../actions/game';

import overlayStyles from '../../css/overlay.css';

import Dropzone from 'react-dropzone';
import EditableTags from '../components/EditableTags';
import { IndexLink, Link } from 'react-router';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import EditableTitle from '../components/EditableTitle';
import Overlay from '../components/Overlay';
import Logo from '../components/Logo';
import Card from '../components/Card';
import Cover from '../components/Cover';

import objFilter from '../utils/obj-filter.js';

const gameSelector = (state, slug) => {
  const game = state.entities.games[slug];
  if(!game) { return null; }
  // TMP
  const gamesSchema = new Schema('games');
  gamesSchema.define({
    owner: new Schema('users'),
    watchers: arrayOf(new Schema('users')),
    technologies: arrayOf(new Schema('technologies')),
  });
  // TMP
  return denormalize(state.entities.games[slug], state.entities, gamesSchema);
};
const isAuthorSelector = (game, user) => game && user ? game.owner.username === user.username : false;
const favoritedByUserSelector = (game, user) => game && user ? game.watchers.includes(user.username) : false;
const isLoadingSelector = (state) => state.games.games.loadingItem;

function mapStateToProps(state, ownProps) {
  const { auth, entities } = state;
  const { slug } = ownProps.params;
  const { games, technologies, users } = entities;
  const currentUser = users[auth.user] || {};

  const game = gameSelector(state, slug);
  return {
    slug,
    game,
    isAuthor: isAuthorSelector(game, currentUser),
    favoritedByUser: favoritedByUserSelector(game, currentUser),
    isLoading: isLoadingSelector(state),
  };
}

@connect(mapStateToProps)
export default class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      edited: {
        name: '',
        logo: '',
        technologies: null,
      },
    };
  }

  componentWillMount() {
    const { slug } = this.props.params;
    if(!this.props.game) {
      this.props.dispatch(loadGame(slug));
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slug !== this.props.slug) {
      this.props.dispatch(loadGame(nextProps.slug));
    }
  }

  validateEditGame() { // TODO: not good here...
    // validate data
    const edited = objFilter(this.state.edited, (e) => !!e);
    this.props.dispatch(editGame(this.props.game.slug, edited));
  }

  favorite(favorited = false) {
    this.props.dispatch(favoriteGame(this.props.slug, favorited));
  }

  render() {
    const { game, isLoading, isEditing, isAuthor, favoritedByUser } = this.props;

    // elements that can be modified by state
    let actions = '', dropzone = '';
    if(isEditing && game) {
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="check" onClick={this.validateEditGame.bind(this)} />
          <IconButton icon="remove" onClick={() => {history.push(`/games/${game.slug}`);}} />
        </div>
      );
    } else if(game && isAuthor) {
      // TODO: Replace with <Link/> inside the IconButton component, verify for external links
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="pencil" onClick={() => {history.push(`/games/${game.slug}/edit`);}} />
        </div>
      );
    }

    let title = '', logo = '';
    if(game) {
      logo = (
        <img
          src={this.state.edited.logo || game.logo}
          style={{objectFit: 'cover', width: '200px', height: '200px', display:'block', borderRadius: '50%', border: '.188em solid #fff'}}
        />
      );
      title = (
        <div style={{flex: '1'}}>
          <EditableTitle title={this.state.edited.name || game.name} isEditing={isEditing}
            onChange={(e) => this.setState({edited: {...this.state.edited, name: e.currentTarget.value}})}
          />
        </div>
      );
    } else {
      title = <h2 style={{color: 'white'}} >Loading...</h2>;
    }

    const renderLogo = (logo) => (
      <div style={{padding: '0.5em'}}>
        <div style={{margin: 'auto', position: 'relative', width: '200px', height: '200px'}}>
          {logo}
        </div>
      </div>
    );

    const renderLogoEdition = (logo) => renderLogo(
      <div>
        {logo}
        <Dropzone
          multiple={false}
          className={cx(overlayStyles.default, {[overlayStyles.dropped]: this.state.edited.logo})}
          activeClassName={overlayStyles.onDrop}
          style={{borderRadius: '50%', margin: 'auto', lineHeight: '200px', textAlign: 'center'}}
          onDrop={(files) => this.setState({edited: {...this.state.edited, logo: this.props.onDropLogo(files)}})}>
          <p className={overlayStyles.content}>
            <span className="fa fa-fw fa-camera fa-2x" /><br/>
            Change logo
          </p>
        </Dropzone>
      </div>
    );

    return (
      <div>

        <Cover src={game.cover}>
          <div className="container">
            <div className="layout layout--bottom">
              <div className="layout__item u-2/3-deskhd u-2/3-desk u-2/3-lap">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {title}
                  {actions}
                </div>
              </div>
              <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
                {!isLoading ?
                  (isEditing ? renderLogoEdition(logo) : renderLogo(logo))
                  :
                  <div style={{textAlign: 'center', margin: '20px 0px', padding: '15px 0px', color: '#ddd'}}>
                    <span className="fa fa-spin fa-refresh fa-3x" />
                  </div>
                }
              </div>
            </div>
          </div>
        </Cover>

        <div className="container">
          <div className="layout layout--rev">

            <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
              <aside style={{padding: '0.5em 0'}}>
                <Card>
                  <div className="content">
                    <ul className="list">
                      <li>
                        <div className="type">
                          <span className="fa fa-user fa-fw"></span>
                          Developer
                        </div>
                        {game ? <Link className="value" to={`/users/${game.owner.username}`}>
                          <img src={game.owner.avatar} alt="" style={{height: '2rem', width: 'auto', display: 'inline', verticalAlign: 'middle', borderRadius: '50%', paddingRight: '5px'}} />
                          {game.owner.username}
                        </Link> : <p>Loading...</p>}
                        {/*<div>
                          <Button>Follow</Button>
                        </div>*/}
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-rocket fa-fw"></span>
                          Type
                        </div>
                        <div>
                          <a href="">Shoot'em up</a>,
                          <a href="">Rogue-like</a>
                        </div>
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-code fa-fw"></span>
                          Techs
                        </div>
                        <div>
                          {game ? <EditableTags
                            tags={this.state.edited.technologies || game.technologies}
                            isEditing={isEditing}
                            onChange={(techs) => {
                              const slug = require('slug');
                              const technologies = techs.map((e) => ({name: e, slug: slug(e)}));
                              this.setState({edited: {...this.state.edited, technologies}});
                            }}
                            placeholder="Add technology"
                          />
                          :
                          <p>Loading...</p>}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div style={{textAlign: 'center'}}>
                    <IconButton icon="heart" size="large" active={favoritedByUser} onClick={() => {this.favorite(favoritedByUser)}} />
                  </div>
                </Card>
              </aside>
            </div>

            <div className="layout__item u-2/3-deskhd u-2/3-desk u-2/3-lap">
              <div style={{padding: '0.5em 0'}}>
                {/*<nav>
                  <ul className="tabs">
                    }<li><IndexLink activeClassName="selected" to={`/games/${this.props.slug}`}>Résumé</IndexLink></li>
                    <li><Link activeClassName="selected" to={`/games/${this.props.slug}/news`}>News</Link></li>
                    <li><Link activeClassName="selected" to={`/games/${this.props.slug}/medias`}>Medias</Link></li>
                    <li><a href="#">Tests</a></li>
                    <li><a href="#">Avis</a></li>
                    <li><a href="#"><span className="fa fa-fw fa-cog"/></a></li>
                  </ul>
                </nav>*/}

                <div className="panel" style={{borderRadius: '3px'}}>{/*0 3px 3px 3px*/}
                  {React.cloneElement(this.props.children, {
                    game,
                    ...this.state.edited, // rewrite properties that has changed
                    isAuthor,
                    isLoading,
                    isEditing,
                    onEdit: (newSubState) => this.setState({
                      edited: {...this.state.edited, ...newSubState}
                    })
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
