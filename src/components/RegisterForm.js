import React, { Component } from 'react';

import { checkUsername } from '../actions/auth';

import Button from './Button';
import AutocheckInputText from './AutocheckInputText';

const RegisterForm = ({ onSubmit, auth: { username }, dispatch }) => {
  return (
    <form onSubmit={onSubmit} className="layout__item u-1/2">
      <div className="form-group">
        <label htmlFor="register-username">Nom d'utilisateur</label>
        <AutocheckInputText
          status={username.status} currentValue={username.value} asyncFunction={(username) => {dispatch(checkUsername(username))}}
          id="register-username" name="register-username" placeholder="JohnSmith" defaultValue={username.value} />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input id="register-email" name="register-email" className="form-input" type="email" placeholder="john.smith@example.com" />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Mot de passe</label>
        <input id="register-password" name="register-password" className="form-input" type="password" placeholder="p4ssw0rd" />
      </div>
      <Button>S'inscrire</Button>
    </form>
  );
}

// export default connect()(RegisterForm);
export default RegisterForm;
