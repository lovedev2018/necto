import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

const signInWidgetConfig = {
    language: 'en',                       // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
    i18n: {
      //Overrides default text when using English. Override other languages by adding additional sections.
      'en': {
        'primaryauth.title': 'Sign In to Necto',   // Changes the sign in text
        'primaryauth.submit': "Let's go",  // Changes the sign in button
        'primaryauth.username.placeholder': " ",
        'primaryauth.password.placeholder': " ",
        // More e.g. [primaryauth.username.placeholder,  primaryauth.password.placeholder, needhelp, etc.].
        // Full list here: https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/dist/properties/login.properties
      }
    },
    // Changes to widget functionality
    features: {
      registration: false,
      rememberMe: true,                  
    },
    baseUrl: 'https://live-widget.oktapreview.com',
    clientId: '0oaexo9c530ZUVuOj0h7',
    redirectUri: 'https://developer.okta.com/live-widget',
    registration: {
        click: function() {
          window.location.href = 'https://acme.com/sign-up';
        }
      }
};

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn(Object.assign(signInWidgetConfig, {baseUrl: this.props.baseUrl}));
    this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
};