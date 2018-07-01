import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";

const Authenticate = ()=> localStorage.getItem("lkti");

const Logout = ()=>{
    localStorage.clear();
};

const PrivateRoute = ({ component: Component, rest }) => (
    <Route
      {...rest}
      render={props =>
        Authenticate()
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

export {
    Logout,
    PrivateRoute,
    Authenticate
};