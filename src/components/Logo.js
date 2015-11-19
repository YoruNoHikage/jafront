import React from 'react';

const Logo = ({ src = 'http://lorempixel.com/200/200', alt = '' }) => {
  return (
    <figure style={{padding: '0.5em'}}>
      <img src={src} alt={alt} style={{display: 'block', margin: 'auto', border: '.188em solid #fff', borderRadius: '50%'}} />
    </figure>
  );
}

export default Logo;
