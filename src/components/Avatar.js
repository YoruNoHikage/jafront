import React, { Component } from "react";

const Avatar = ({title, src = 'http://www.sonniss.com/wp-content/uploads/edd/2015/08/17797.png'}) => {
  const caption = title ? (<figcaption>{title}</figcaption>) : '';

  return (
    <figure>
      <img src={src} alt="Avatar de YoruNoHikage" width="80px" />
      {caption}
    </figure>
  );
}

export default Avatar;
