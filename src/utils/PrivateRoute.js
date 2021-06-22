import { Route, Redirect } from "react-router-dom";
import { getSessionData } from "../services/authentication.service";

import React from "react";

export default function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getSessionData() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
