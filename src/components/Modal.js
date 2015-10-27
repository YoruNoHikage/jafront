import React from 'react';
import Base from 'react-modal';

import styles from '../../css/modal.css';

const Modal = ({children, ...rest}) => {
  return (
    <Base className={styles.default} {...rest} style={{overlay: {backgroundColor : 'rgba(0, 0, 0, 0.75)'}, content: {border: '', borderRadius: ''}}}>
      {children}
    </Base>
  );
};

export default Modal;
