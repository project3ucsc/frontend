// import PrivateRoute from "utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/student/Dashboard";
import Fp from "pages/ForgotPass";
import tvprogramme from "pages/student/tvprogramme";
import NotFound404 from "pages/NotFound404";

// import { Role } from "utils/common";

export default function StudentRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/d" component={Dashboard} />
        <Route exact path="/s" component={Fp} />
        <Route exact path="/tvprogramme" component={tvprogramme} />
        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
