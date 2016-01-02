import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import Button from '../components/Button';
import Well from '../components/Well';

import { loadGames } from '../actions/game';

// Duplicate from GamesPages, TODO: change this
function mapStateToProps(state) {
  let games = []; // TODO: change this
  for(var i in state.entities.games) {
    games.push(state.entities.games[i]);
  }

  return {
    games,
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
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          contributors: json,
        });
      });
  }

  render() {
    const thumbnailStyles = {display: 'inline-block', margin: '0 10px 10px 0'};

    let lastGames = '';
    if(!this.props.isLoading) {
      lastGames = this.props.games.map((game) => {
        return (
          <div key={game.slug} style={thumbnailStyles}>
            <img style={{display: 'block'}} src={game.logo}/>
          </div>
        );
      });
    }
    const contributors = this.state.contributors.map((e, index) => {
      return (
        <a key={'contributors-' + index} href={e.html_url}>
          <img src={e.avatar_url + '&s=24'} />
        </a>
      );
    });
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

          <div className="shout-panel">
            <div className="column">
              <h3>Vous développez un jeu par plaisir sur votre temps libre ?</h3>
              <p>Rejoignez la communauté et partagez votre connaissance et échanger autour de votre jeu et les autres.</p>
            </div>

            <div className="column">
              <h3>Vous êtes un joueur avec de bonnes idées ?</h3>
              <p>Rejoignez la communauté et proposez vos idées pour améliorer les jeux qui vous font plaisir et aidez-les à progresser !</p>
            </div>
          </div>

          <h2>Les derniers jeux ajoutés</h2>

          <div style={{margin: 'auto', lineHeight: '0', textAlign: 'center'}}>
            {lastGames}
            <div style={thumbnailStyles}>
              <div style={{display: 'table-cell', verticalAlign: 'middle', border: '5px dashed #ccc', width: '200px', height: '200px'}}>
                <Link to="games/new">
                  <Button> {/*Fix this Link/Button*/}
                    <i className="fa fa-fw fa-plus" />
                    Ajoutez votre jeu !
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center'}}>
            Made with <i className="fa fa-heart"></i> by <br/>
            {contributors}
          </div>

        </div>
      </div>
    );
  }
}
