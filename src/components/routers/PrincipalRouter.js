import { Route, Switch } from "react-router-dom";

import Dashboard from "pages/teacher/Dashboard";
import NotFound404 from "pages/NotFound404";
import NewSclAdminReq from "pages/principal/NewSclAdminReq";

export default function PrincipalRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/SclAdminManagement" component={NewSclAdminReq} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
