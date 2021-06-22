import { Route, Redirect } from "react-router-dom";
import { getSessionData } from "../services/authentication.service";

import React from "react";

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getSessionData() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
