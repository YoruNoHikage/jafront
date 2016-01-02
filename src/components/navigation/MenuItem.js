import React from "react";
import { Link } from "react-router";

const MenuItem = ({ children, icon, to = '#' }) => (
  <li>
      <Link to={to}>
          <i className={"fa fa-fw fa-" + icon}></i>
          {children}
      </Link>
  </li>
);

export default MenuItem;
