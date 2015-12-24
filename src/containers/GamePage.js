import React, { Component } from "react";
import { connect } from 'react-redux';
import cx from 'classnames';

import { loadGame, favoriteGame } from '../actions/game';

import overlayStyles from '../../css/overlay.css';

import Dropzone from 'react-dropzone';
import EditableTags from '../components/EditableTags';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import EditableTitle from '../components/EditableTitle';
import Overlay from '../components/Overlay';
import Logo from '../components/Logo';
import Card from "../components/Card";
import Timeline from "../components/Timeline";
import Entry from "../components/Entry";

import GameList from "../components/GameList";

function mapStateToProps(state) {
  const { slug } = state.router.params;
  const { games, technologies, users } = state.entities;
  let currentUser = state.auth.user || {};
  // TODO: tmp
  currentUser.username = 'YoruNoHikage';

  // getting game if it exists in entities
  const rawGame = games[slug];
  let game = rawGame;
  if(game) {
    game = {
      ...rawGame,
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
        title: '',
        logo: '',
        technologies: '',
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

  favorite(favorited = false) {
    this.props.dispatch(favoriteGame(this.props.slug, favorited));
  }

  render() {
    const { game, technologies, isLoading, isEditing, favoritedByUser } = this.props;

    const tmpTimeline = [{
      icon: 'https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=50',
      alt: 'Avatar de YoruNoHikage',
      content: {
        text: <p><a href="#">YoruNoHikage</a> a ajouté ce jeu à ses favoris.</p>,
        date: 'Il y a 11h',
      }
    },{
      icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/320px-Twitter_Bird.svg.png',
      alt: 'Twitter',
      content: {
        text: <p>Retrouvez-nous sur @JeuxAmateurs, un site de ouf pour parler de vos projets !</p>,
        date: 'Il y a 2 jours',
      }
    },{
      icon: 'https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=50',
      alt: 'Avatar de YoruNoHikage',
      content: {
        text: <p>Une nouvelle version est sortie !</p>,
        date: 'Il y a 4 jours',
        attachment: <Button style={{display: 'inline-block'}} href="#">Download</Button>,
      },
    },{
      icon: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
      alt: 'GitHub',
      content: {
        text: <p>New release : <a href="#">2.5.3</a></p>,
        date: 'Le 20/12/2014',
        attachment: <a href="#">Voir sur GitHub</a>,
      },
    }];
    const timeline = tmpTimeline.map((entry, i) => {
      return (
        <Entry key={i} icon={entry.icon} alt={entry.alt}>
          {entry.content.text}
          <span className="meta">{entry.content.date}</span>
          <div className="attachment">
            {entry.content.attachment}
          </div>
        </Entry>
      );
    });

    // elements that can be modified by state
    let actions = '', dropzone = '';
    const logo = (
      <div style={{
        background: `url(${this.state.edited.logo || 'http://lorempixel.com/200/200'}) no-repeat center center / cover`,
        width: '200px', height: '200px',
        borderRadius: '50%',
        border: '.188em solid #fff'
      }}></div>
    );
    if(isEditing && game) {
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="check" onClick={() => {this.props.history.push(`/games/${game.slug}`);}} />
          <IconButton icon="remove" onClick={() => {this.props.history.push(`/games/${game.slug}`);}} />
        </div>
      );
      dropzone = (
        <Dropzone
          multiple={false}
          className={cx(overlayStyles.default, {[overlayStyles.dropped]: this.state.edited.logo})}
          activeClassName={overlayStyles.onDrop}
          style={{borderRadius: '50%', margin: 'auto', lineHeight: '200px', textAlign: 'center'}}
          onDrop={(files) => this.setState({edited: this.props.onDropLogo(files)})}>
          <p className={overlayStyles.content}>
            <i className="fa fa-fw fa-camera fa-2x"></i><br/>
            Change logo
          </p>
        </Dropzone>
      );
    } else if(game) {
      // TODO: Replace with <Link/> inside the IconButton component, verify for external links
      actions = (
        <div style={{paddingLeft: '10px'}}>
          <IconButton icon="edit" onClick={() => {this.props.history.push(`/games/${game.slug}/edit`);}} />
        </div>
      );
    }

    let title = '', technologiesTmp = '';
    if(game) {
      title = (
        <div style={{flex: '1'}}>
          <EditableTitle title={game.name} isEditing={isEditing}
            onChange={(e) => this.setState({edited: this.props.onChangeTitle(e.currentTarget.value)})}
          />
        </div>
      );
      technologiesTmp = <EditableTags tags={game.technologies} isEditing={isEditing} onChange={(e) => console.log(e)} placeholder="Add technology" />;
    } else {
      title = <h2 style={{color: 'white'}} >Loading...</h2>;
      technologiesTmp = <p>Loading...</p>;
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
                        <a className="type" href="#">
                          <span className="fa fa-users fa-fw"></span>
                          Awesome team
                        </a>
                        <div className="value">
                          <Button>Follow</Button>
                        </div>
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-users fa-fw"></span>
                          Type
                        </div>
                        <div className="value">
                          <a href="">Shoot'em up</a>,
                          <a href="">Rogue-like</a>
                        </div>
                      </li>
                      <li>
                        <div className="type">
                          <span className="fa fa-code fa-fw"></span>
                          Techs
                        </div>
                        <div className="value">
                          {technologiesTmp}
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
                      <li className="selected"><a href="#">Résumé</a></li>
                      <li><a href="#">News</a></li>
                      <li><a href="#">Tests</a></li>
                      <li><a href="#">Avis</a></li>
                    </ul>
                  </nav>

                  <div className="panel" style={{borderRadius: '0px 3px 3px 3px'}}>
                    <Timeline isLoading={isLoading}>
                      {timeline}
                    </Timeline>
                  </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
