import React, { Component } from 'react';
import { connect } from 'react-redux';

import Timeline from "../components/Timeline";
import Entry from "../components/Entry";
import Button from '../components/Button';

function mapStateToProps(state) {
  return {
    isLoading: state.games.games.loadingItem,
  };
}

@connect(mapStateToProps)
export default class GameTimeline extends Component {
  render() {
    const { isLoading } = this.props;

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

    return (
      <Timeline isLoading={isLoading}>
        {timeline}
      </Timeline>
    );
  }
}
