import { Route, Switch } from "react-router-dom";

import Dashboard from "pages/principal/Dashboard";
import NotFound404 from "pages/NotFound404";
import NewSclAdminReq from "pages/principal/NewSclAdminReq";
import Profile from "pages/student/Profile";
import TeacherAnalys from "pages/principal/TeacherAnalys";

export default function PrincipalRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/TeacherAnalys" component={TeacherAnalys}/>
        <Route exact path="/SclAdminManagement" component={NewSclAdminReq} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
