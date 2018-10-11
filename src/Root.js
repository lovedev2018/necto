import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Protected from './Protected';

function onAuthRequired({history}) {
    history.push('/login');
}

class Root extends Component {
    render() {
        return (
        <Router>
            <Switch>
                <Security issuer='https://{yourOktaDomain}/oauth2/default'
                    client_id='{clientId}'
                    redirect_uri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                >
                    <Route path='/' exact component={Home} />
                    <SecureRoute path='/protected' component={Protected} />
                    <Route path='/login' render={() => <Login baseUrl='/' />} />
                    <Route path='/implicit/callback' component={ImplicitCallback} />
                </Security>
            </Switch>
        </Router>
        );
    }
}

export default Root;