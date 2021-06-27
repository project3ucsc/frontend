import { Route, Redirect } from "react-router-dom";
import auth from "Services/authentication.service";

export default function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = auth.currentUserValue;
        console.log(currentUser);
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
}
