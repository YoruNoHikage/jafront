import React from 'react';
import classNames from 'classnames';

import styles from '../../css/icon-button.css';

const IconButton = ({children, icon, size, className, ...rest}) => {
  const classes = classNames(
    styles.default,
    className,
    {
      [styles[size]]: size,
    },
  );

  const Element = rest.href ? 'a' : 'button';

  return (
    <Element className={classes} {...rest}>
      <i className={`fa fa-${icon}`}></i>
      {children}
    </Element>
  );
}

export default IconButton;
