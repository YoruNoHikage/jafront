import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import cx from 'classnames';

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

import objFilter from '../utils/obj-filter.js';

function mapStateToProps(state, ownProps) {
  const { auth, entities } = state;
  const { slug } = ownProps.params;
  const { games, technologies, users } = entities;
  const currentUser = users[auth.user] || {};

  // getting game if it exists in entities
  let game = games[slug];
  if(game) {
    game = {
      ...game,
      technologies: game.technologies.map(slug => technologies[slug]),
    };
  }

  return {
    slug,
    game,
    favoritedByUser: game && currentUser ? game.watchers.includes(currentUser.username) : false,
    isLoading: state.games.games.loadingItem,
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
    const { game, isLoading, isEditing, favoritedByUser } = this.props;

    // elements that can be modified by state
    let actions = '', dropzone = '';
    if(isEditing && game) {
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="check" onClick={this.validateEditGame.bind(this)} />
          <IconButton icon="remove" onClick={() => {this.props.dispatch(routeActions.push(`/games/${game.slug}`));}} />
        </div>
      );
      dropzone = (
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
      );
    } else if(game) {
      // TODO: Replace with <Link/> inside the IconButton component, verify for external links
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="pencil" onClick={() => {this.props.dispatch(routeActions.push(`/games/${game.slug}/edit`));}} />
        </div>
      );
    }

    let title = '', logo = '';
    if(game) {
      logo = (
        <div style={{
          background: `url(${this.state.edited.logo || game.logo}) no-repeat center center / cover`,
          width: '200px', height: '200px',
          borderRadius: '50%',
          border: '.188em solid #fff'
        }}></div>
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

    return (
      <div>

        <header style={{background: '#2c2c2c'}}>
          <div className="container">
            <div className="layout layout--bottom">
              <div className="layout__item u-2/3-deskhd u-2/3-desk u-2/3-lap">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {title}
                  {actions}
                </div>
              </div>
              <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
                <div style={{padding: '0.5em'}}>
                  <div style={{margin: 'auto', position: 'relative', width: '200px', height: '200px'}}>
                    {logo}
                    {dropzone}
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
                  <div className="content">
                    <ul className="list">
                      <li>
                        {game ? <Link className="type" to={`/users/${game.owner}`}>
                          <span className="fa fa-user fa-fw"></span>
                          {game.owner}
                        </Link> : <p>'Loading...'</p>}
                        <div>
                          <Button>Follow</Button>
                        </div>
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-users fa-fw"></span>
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
                          /> : <p>Loading...</p>}
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
                <nav>
                  <ul className="tabs">
                    <li><IndexLink activeClassName="selected" to={`/games/${this.props.slug}`}>Résumé</IndexLink></li>
                    <li><Link activeClassName="selected" to={`/games/${this.props.slug}/news`}>News</Link></li>
                    <li><Link activeClassName="selected" to={`/games/${this.props.slug}/medias`}>Medias</Link></li>
                    {/*<li><a href="#">Tests</a></li>
                    <li><a href="#">Avis</a></li>
                    <li><a href="#"><span className="fa fa-fw fa-cog"/></a></li>*/}
                  </ul>
                </nav>

                <div className="panel" style={{borderRadius: '0px 3px 3px 3px'}}>
                  <p>Todo List :</p>
                  <ul>
                    <li>Medias : Any member can add media</li>
                  </ul>
                  {this.props.children}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
