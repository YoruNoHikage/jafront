import React from 'react';
import { connect } from 'react-redux';
import history from '../history';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if(!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        const search = redirectAfterLogin !== '/' ? `?returnTo=${redirectAfterLogin}` : '';
        history.replace({
          pathname: '/login',
          search,
          // state: { modal: true }
        });
      }
    }

    render() {
      return this.props.isAuthenticated === true ? (<Component {...this.props}/>) : null;
    }
  }

  const mapStateToProps = ({ auth, entities }) => {
    if(auth.user) {
      return {
        isAuthenticated: !!auth.user,
        token: entities.users[auth.user].token,
        username: entities.users[auth.user].username,
      };
    }

    return { isAuthenticated: false };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
