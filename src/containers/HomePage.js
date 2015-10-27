import React, { Component } from "react";

import GameList from "../components/GameList.js";
import grid from "minigrid";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      contributors: []
    };
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
    const lastGames = new Array(8).fill(null).map((e,index) => {
      return (
        <div key={index} className="item">
          <img src={"http://lorempixel.com/200/200?" + index}/>
        </div>
      );
    });
    const contributors = this.state.contributors.map((e) => {
      return (
        <a href={e.html_url}>
          <img src={e.avatar_url + '&s=24'} />
        </a>
      );
    });
    grid({container: '.last-games', item: '.item', gutter: 5});
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

          <div className="last-games" style={{overflow: 'hidden', margin: 'auto'}}>
            {lastGames}
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
