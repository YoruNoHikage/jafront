import React, { Component, cloneElement } from 'react';

import classNames from 'classnames';

import styles from '../../css/buttongroup.css';

export default class ButtonGroup extends Component {
  render() {
    const classes = classNames(
      styles.default,
      this.props.className ? this.props.className : '',
    );
    const buttons = this.props.children.map((btn, i) => {
      return cloneElement(btn, {className: styles.button, key: i});
    });

    return (
      <div className={classes}>
        {buttons}
      </div>
    )
  }
}
