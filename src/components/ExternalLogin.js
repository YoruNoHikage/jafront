import React from 'react';

const buttonStyle = {
  opacity: '0.3',
  border: 'none',
  padding: '0.25rem 0.5rem',
  whiteSpace: 'nowrap',
};

const ExternalLogin = (props) => (
  <div {...props}>
    <div className="form-group">
      <a href="https://github.com/login/oauth/authorize?client_id=164a33cf96520b3b9c15" role="button" style={{...buttonStyle, backgroundColor: '#F5F5F5', color: '#333', opacity: '1'}}>
        <i className="fa fa-fw fa-github"></i>
        Se connecter avec GitHub
      </a>
    </div>
    <div className="form-group">
      <button type="button" style={{...buttonStyle, backgroundColor: '#55ACEE', color: '#fff'}}>
        <i className="fa fa-fw fa-twitter"></i>
        Se connecter avec Twitter
      </button>
    </div>
    <div className="form-group">
      <a href="#" role="button" style={{...buttonStyle, backgroundColor: '#6441A5', color: '#fff'}}>
        <i className="fa fa-fw fa-twitch"></i>
        Se connecter avec Twitch
      </a>
    </div>
    <div className="form-group">
      <a href="#" role="button" style={{...buttonStyle, backgroundColor: '#262627', color: '#E6E6E5'}}>
        <i className="fa fa-fw fa-steam"></i>
        Se connecter avec Steam
      </a>
    </div>
  </div>
);

export default ExternalLogin;
