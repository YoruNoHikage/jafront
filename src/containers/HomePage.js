import React, { Component } from 'react';
import { connect } from 'react-redux';

import { denormalize } from 'denormalizr';
import { Schemas } from '../middlewares/api';

import { Link } from 'react-router';
import ButtonLink from '../components/ButtonLink';
import Button from '../components/Button';
import Well from '../components/Well';
import Thumbnail from '../components/Thumbnail';

// Feed
import Timeline from "../components/Timeline";
import Entry from "../components/Entry";
import ButtonGroup from '../components/ButtonGroup';

import { loadGames } from '../actions/game';

// Duplicate from GamesPages, TODO: change this
const gamesSelector = (state) => Object.values(state.entities.games).map(game => denormalize(game, state.entities, Schemas.GAME));

function mapStateToProps(state) {
  let auth = { isAuthenticated: !!state.auth.user };
  if(state.auth.user) {
    auth['user'] = state.entities.users[auth.user];
  }

  return {
    ...auth,
    games: gamesSelector(state),
    isLoading: !!state.games.games.loadingList,
  };
}

@connect(mapStateToProps)
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      contributors: []
    };
  }

  componentWillMount() {
    this.props.dispatch(loadGames());
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/JeuxAmateurs/website/contributors')
      .then(response => response.json())
      .then(json => {
        this.setState({
          contributors: Array.isArray(json) ? json : [],
        });
      });
  }

  render() {
    const thumbnailStyles = {display: 'inline-block', margin: '0 10px 10px 0'};

    const tmpTimeline = [{
      icon: 'https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=50',
      alt: 'Avatar de YoruNoHikage',
      content: {
        text: <p><a href="#">YoruNoHikage</a> a ajouté une <a href="#">review</a> de <a href="#">Test</a></p>,
        date: 'Il y a 11h',
        attachment: (
          <div>
            <div style={{color: '#ccc', borderLeft: '5px solid #ccc', paddingLeft: '5px', marginBottom: '5px'}}>
              <p>Super jeu de ouf, je kiffe trop sa mère de la balle de ce jeu méga trop bien c'est génial continue comme ça !</p>
            </div>
            <Button>Commenter</Button>
          </div>
        )
      }
    },{
      icon: 'https://secure.gravatar.com/avatar/bf71cb74fc30a417be576c509d8853fc?s=50',
      alt: 'Avatar de YoruNoHikage',
      content: {
        text: <p><a href="#">YoruNoHikage</a> a ajouté <a href="#">Test</a> à ses favoris.</p>,
        date: 'Il y a 11h',
      }
    },{
      icon: 'http://www.newstheday.net/fr/La-photo/game.jpg',
      alt: 'Logo du jeu',
      content: {
        text: <p><a href="#">Test</a> vient de passer en version 5.2.3.</p>,
        date: 'Il y a 4 jours',
        attachment: (
          <ButtonGroup>
            <ButtonLink style={{display: 'inline-block'}} href="#">Download</ButtonLink>
            <ButtonLink style={{display: 'inline-block'}} href="#">Review</ButtonLink>
          </ButtonGroup>
        ),
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

    let lastGames = '';
    if(!this.props.isLoading) {
      lastGames = this.props.games.map((game) => {
        return (
          <Thumbnail image={game.logo} key={game.slug} link={`/games/${game.slug}`}>
            <h3 style={{fontVariant: 'small-caps', textTransform: 'capitalize', fontWeight: '600', padding: '10px'}}>
              <Link style={{color: 'white'}} to={`/games/${game.slug}`}>{game.name}</Link>
            </h3>
          </Thumbnail>
        );
      });
    }
    const contributors = this.state.contributors.map((e, index) => (
      <a key={'contributors-' + index} href={e.html_url}>
        <img src={e.avatar_url + '&s=24'} />
      </a>
    ));
    return (
      <div>
        <div className="title">
          <div className="container">
            <div className="">
              <h1><img src="images/logo.svg" alt="JeuxAmateurs"/></h1>
              <h2>Communauté de développement amateur de jeux vidéo.</h2>
            </div>
          </div>
        </div>

        <div className="container">

          {!this.props.isAuthenticated ? <div className="shout-panel">
            <div className="column">
              <h3>Vous développez un jeu par plaisir sur votre temps libre ?</h3>
              <p>Rejoignez la communauté et partagez votre connaissance et échanger autour de votre jeu et les autres.</p>
            </div>

            <div className="column">
              <h3>Vous êtes un joueur avec de bonnes idées ?</h3>
              <p>Rejoignez la communauté et proposez vos idées pour améliorer les jeux qui vous font plaisir et aidez-les à progresser !</p>
            </div>
          </div> : null}

          <div style={{display: 'flex'}}>

            {/*this.props.isAuthenticated ? <div style={{flex: '1'}}>
              <h2>Feed</h2>
              <Timeline>{timeline}</Timeline>
            </div> : null*/}

            <div style={{flex: '1'}}>
              <h2>Les derniers jeux ajoutés</h2>
              <div style={{margin: 'auto', lineHeight: '0', textAlign: 'center'}}>
                {lastGames}
                <div style={thumbnailStyles}>
                  <div style={{display: 'table-cell', verticalAlign: 'middle', border: '5px dashed #ccc', width: '200px', height: '200px'}}>
                    <ButtonLink to="/games/new">
                      <span className="fa fa-fw fa-plus" />
                      Ajoutez votre jeu !
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div style={{textAlign: 'center'}}>
            Made with <span className="fa fa-code" /> by <br/>
            {contributors}
          </div>

        </div>
      </div>
    );
  }
}
