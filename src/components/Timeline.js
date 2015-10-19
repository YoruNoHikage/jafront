import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

import load from './load';

import Button from './Button';
import Well from './Well';
import Entry from './Entry';

const Timeline = ({ children, isLoading }) => {
  const empty = (
    <Well>
      <p>
        Aucune actualité pour le moment.<br/>
        Vous avez des informations sur ce jeu ?<br/>
        <Button>Contribuez</Button>
      </p>
    </Well>
  );
  children = children || empty;

  return (
    <div className="feed">
      <VelocityTransitionGroup component="div" enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
        {children}
      </VelocityTransitionGroup>
    </div>
  );
};

export default load(Timeline);
