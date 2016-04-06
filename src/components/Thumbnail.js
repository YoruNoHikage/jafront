import React from 'react';

import Link from 'react-router/lib/Link';

import styles from '../../css/thumbnail.css';

const Thumbnail = ({ children, image = '', alt = '', link = ''}) => (
  <figure className={styles.default}>
    <Link to={link}><img className={styles.image} src={image} alt={alt}/></Link>
    <figcaption className={styles.children}>
      {children}
    </figcaption>
  </figure>
);

export default Thumbnail;
