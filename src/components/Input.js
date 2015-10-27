import React from 'react';
import classnames from 'classnames';

import styles from '../../css/input.css';

const Input = ({ className, ...rest }) => (
  <input className={classnames(styles.default, className)} {...rest} />
);

export default Input;
