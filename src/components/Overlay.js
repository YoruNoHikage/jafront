import React from 'react';

import styles from '../../css/overlay.css';

const Overlay = ({ children, ...rest }) => (
  <div className={styles.default} {...rest}>
    {children}
  </div>
);

export default Overlay;
