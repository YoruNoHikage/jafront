import React from 'react';

const Cover = ({ children, src = '' }) => (
  <header style={{position: 'relative'}}>
    <div style={{
      background: `url(${src}) #2c2c2c`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      filter: src ? 'contrast(160%) brightness(40%)' : '',
    }} />
    {React.cloneElement(children, {style: {position: 'relative'}})}
  </header>
);

export default Cover;
