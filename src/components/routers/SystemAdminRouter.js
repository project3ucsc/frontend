import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/sysadmin/Dashboard";
import EduProg from "pages/sysadmin/EduProg";
import Home from "pages/sysadmin/Home";
import NotFound404 from "pages/NotFound404";

export default function SystemAdminRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/eduProg" component={EduProg} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
