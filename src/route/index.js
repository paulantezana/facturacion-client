import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";
import { authenticate } from './../helpers/authenticate';

// import Home from "./home"

import Login from "./login";
import App from "./../layout/app";


const Register = () => <h1>Register</h1>;

function RouterConfig() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;

const PrivateRoute = ({ component: Component, rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticate()
            ? ( <Component {...props} /> )
            : ( <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);