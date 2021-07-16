import { Route, Switch } from "react-router-dom";

import Dashboard from "pages/teacher/Dashboard";
import NotFound404 from "pages/NotFound404";

export default function PrincipalRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
