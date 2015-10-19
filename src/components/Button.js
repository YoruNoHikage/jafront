import React from 'react';
import classNames from 'classnames';

import styles from '../../css/button.css';

const Button = ({children, block, size, type, className, ...rest}) => {
  const classes = classNames(
    styles.default,
    className,
    {
      [styles.block]: block,
      [styles[size]]: size,
      [styles[type]]: type,
    },
  );

  const Element = rest.href ? 'a' : 'button';

  return (
    <Element className={classes} {...rest}>
      {children}
    </Element>
  );
}

export default Button;
