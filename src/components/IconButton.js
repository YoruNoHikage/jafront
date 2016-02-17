import React, { Component } from 'react';
import classNames from 'classnames';

import styles from '../../css/icon-button.css';

export default class IconButton extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false,
    };
  }

  render() {
    const { children, icon, iconActive, size, color = '#ddd', active = false, className, ...rest } = this.props;
    const iconHover = iconActive || icon;
    const classes = classNames(
      styles.default,
      className,
      {
        [styles[size]]: size,
        [styles['active']]: active,
      },
    );

    const iconClasses = classNames(
      'fa',
      active && this.state.hovering ? `fa-${iconHover}` : `fa-${icon}`,
    );

    const Element = rest.href ? 'a' : 'button';

    return (
      <Element className={classes} style={active && this.state.hovering ? {color} : {}}
        onMouseOver={() => this.setState({hovering: true})}
        onMouseOut={() => this.setState({hovering: false})} {...rest}>
        <span className={iconClasses} />
        {children}
      </Element>
    );
  }
}
