import React from 'react';

const Entry = ({ children, icon, alt }) => {
  return (
    <div className="entry" style={{display: 'flex'}}>
      <div className="icon">
        <img src={icon} alt={alt} />
      </div>
      <div className="content" style={{flex: '1'}}>
        {children}
      </div>
    </div>
  );
};

export default Entry;
