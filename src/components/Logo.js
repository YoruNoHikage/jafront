import React from 'react';

const Logo = ({ src = 'http://lorempixel.com/200/200' }) => {
  return (
    <figure style={{padding: '0.5em'}}>
      <img src={src} alt="Avatar de YoruNoHikage" style={{display: 'block', margin: 'auto', background: 'rgb(255, 255, 255)', padding: '.188em', borderRadius: '50%'}} />
    </figure>
  );
}

export default Logo;
