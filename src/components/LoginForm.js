import React, { Component } from 'react';

import { checkUsername } from '../actions/auth';

import Button from './Button';

const LoginForm = ({ className, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="form-group">
        <label htmlFor="login-username">Nom d'utilisateur</label>
        <input id="login-username" name="login-username" className="form-input" type="text" placeholder="JohnSmith" />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Mot de passe</label>
        <input id="login-password" name="login-password" className="form-input" type="password" placeholder="p4ssw0rd" />
      </div>
      <Button>Connexion</Button>
    </form>
  );
}

export default LoginForm;
