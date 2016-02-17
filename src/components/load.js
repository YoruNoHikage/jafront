import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

export default function load(Component) {
  return function Loader({children, isLoading, ...rest}) {
    let loader;
    if(isLoading) {
      const absolute = {
        position: 'absolute',
        top: '0', left: '0', right: '0', bottom: '0',
      };
      loader = (
        <div key="loader" style={{background: '#fff', textAlign: 'center', color: '#ddd', margin: 'auto', padding: '5rem 0', zIndex: '2', ...absolute}}>
          <span className="fa fa-spin fa-refresh fa-3x" />
          <p style={{fontSize: '1.5em', paddingTop: '1em'}}>Récupération des informations...</p>
        </div>
      );
    }

    return (
      <div style={{position: 'relative'}}>
        <VelocityTransitionGroup component="div" enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
          {loader}
        </VelocityTransitionGroup>
        <Component {...rest}>
          {children}
        </Component>
      </div>
    );
  };
}
