// src/Login.js

import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import OktaSignInWidget from '../../OktaSignInWidget';
import { withAuth } from '@okta/okta-react';
import './style.css';

export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      authenticated: null
    };
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess(res) {
    if (res.status === 'SUCCESS') {
      return this.props.auth.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError(err) {
    console.log('error logging in', err);
  }

  render() {
    if (this.state.authenticated === null) return null;
    return (
      <div className="container">
        <div className="logo-container">
          <div className="logo"></div>
          <div className="neighbors-us">
            <span>Your Neighbors</span>
            <span className="i-heart"></span>
            <span>us</span>
          </div>
        </div>
        <div className="login-container">
          <div className="login">
            <OktaSignInWidget
              baseUrl={this.props.baseUrl}
              onSuccess={this.onSuccess}
              onError={this.onError}
            />
          </div>
        </div>  
      </div>
    )
  }
});