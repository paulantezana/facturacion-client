import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";

import { PrivateRoute } from './utils/auth';

import UserLayout from "./layout/UserLayout";
import AppLayout from "./layout/AppLayout";

function RouterConfig() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={UserLayout}/>
                <PrivateRoute path="/" component={AppLayout} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;