import React from 'react';

import styles from '../../css/entry.css';

const Entry = ({ children, icon, alt }) => {
  // first div TMP, due to velocity's display block
  return (
    <div>
    <div className="entry" style={{display: 'flex'}}>
      <div className={styles.icon}>
        <img src={icon} alt={alt} />
      </div>
      <div className={styles.content} style={{flex: '1'}}>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Entry;
