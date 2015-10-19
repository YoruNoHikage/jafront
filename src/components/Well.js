import React from 'react';

import styles from '../../css/well.css';

const Well = ({ children, ...rest }) => (
  <div className={styles.default} {...rest}>
    {children}
  </div>
);

export default Well;
