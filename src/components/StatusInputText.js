import React from 'react';
import classnames from 'classnames';

import styles from '../../css/autocheck-input.css';

const StatusInputText = ({status, currentValue, ...rest}) => {
  const classes = classnames('form-input', styles.default, {
    [styles.success]: status === 'success',
    [styles.error]: status === 'error',
    [styles.loading]: status === 'loading',
  });

  let icon;
  if(status !== '' && currentValue !== '') {
    const iconClasses = classnames('fa', {
      'fa-check': status === 'success',
      'fa-warning': status === 'error',
      'fa-refresh fa-spin': status === 'loading',
    });
    icon = <span className={iconClasses} />;
  }

  return (
    <div style={{position: 'relative'}}>
      <input className={classes} type="text" {...rest} />
      {icon}
    </div>
  );
};

export default StatusInputText;
