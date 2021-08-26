import { Route, Switch } from "react-router-dom";

import Dashboard from "pages/teacher/Dashboard";
import Home from "pages/Home";
import ApplyLeave from "pages/teacher/ApplyLeave";
import NotFound404 from "pages/NotFound404";
import SubPage from "pages/teacher/SubPage";
import ClassInCharge from "pages/teacher/ClassInCharge";

// import PrivateRoute from "utils/PrivateRoute";
// import { Role } from "utils/common";

export default function TeacherRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/subject" component={SubPage} />
        <Route exact path="/s" component={Home} />
        <Route exact path="/applyleave" component={ApplyLeave} />
        <Route exact path="/classincharge" component={ClassInCharge} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
