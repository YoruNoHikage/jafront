import React, { Component } from "react";
import { connect } from 'react-redux';

import { loadGame, favoriteGame } from '../actions/game';

import Dropzone from 'react-dropzone';
import EditableTags from '../components/EditableTags';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import EditableTitle from '../components/EditableTitle';
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
    this.state = {};
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

  onDrop(files) {
    files.forEach((file)=> {
      this.setState({
        logoTmp: file.preview,
      });
    });
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
        attachment: <Button href="#">Download</Button>,
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
    let actions = '', logo = '';
    if(isEditing && game) {
      actions = (
        <div style={{display: 'inline-block'}}>
          <IconButton icon="check" onClick={() => {this.props.history.pushState(null, `/games/${game.slug}`);}} />
          <IconButton icon="remove" onClick={() => {this.props.history.pushState(null, `/games/${game.slug}`);}} />
        </div>
      );
      logo = (
        <Dropzone style={{}} onDrop={this.onDrop.bind(this)}>
          <p><i className="fa fa-fw fa-photo="></i>Envoyer un logo</p>
          <Logo src={this.state.logoTmp || "http://lorempixel.com/200/200"} />
        </Dropzone>
      );
    } else if(game) {
      // TODO: Replace with <Link/> inside the IconButton component, verify for external links
      actions = (
        <div style={{display: 'inline-block'}}>
          <IconButton icon="edit" onClick={() => {this.props.history.pushState(null, `/games/${game.slug}/edit`);}} />
        </div>
      );
      logo = <Logo src="http://lorempixel.com/200/200" />; // TODO: game.logo
    } else {
      logo = <Logo src="http://lorempixel.com/200/200" />; // TODO: placeholder
    }

    let title = '', technologiesTmp = '';
    if(game) {
      title = <div style={{display: 'inline-block'}}><EditableTitle title={game.name} isEditing={isEditing} /></div>;
      technologiesTmp = <EditableTags tags={game.technologies} isEditing={isEditing} placeholder="Add technology" />;
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
                {title}
                {actions}
              </div>
              <div className="layout__item u-1/3-deskhd u-1/3-desk u-1/3-lap">
                {logo}
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
