import React from "react";
import { Link } from "react-router";

const MenuItem = ({ children, icon, to = '#' }) => (
  <li>
      <Link to={to}>
          <span className={"fa fa-fw fa-" + icon} />
          {children}
      </Link>
  </li>
);

export default MenuItem;
