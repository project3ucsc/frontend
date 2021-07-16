import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/sysadmin/Dashboard";
import EduProg from "pages/sysadmin/EduProg";
import Home from "pages/sysadmin/Home";
import School from "pages/sysadmin/School";
import RegSchool from "pages/sysadmin/RegSchool";
import NotFound404 from "pages/NotFound404";

export default function SystemAdminRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/eduProg" component={EduProg} />
        <Route exact path="/School" component={School} />
        <Route exact path="/RegSchool" component={RegSchool} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
