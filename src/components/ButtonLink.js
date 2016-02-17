import React from 'react';

import { Link } from 'react-router';
import Button from './Button';

const ButtonLink = ({ children, ...rest }) => (
  <Button element={rest.to ? Link : 'a'} {...rest}>
    {children}
  </Button>
);

export default ButtonLink;
