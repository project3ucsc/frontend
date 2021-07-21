// import PrivateRoute from "utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/student/Dashboard";
import StudentTimeTable from "pages/student/StudentTimeTable";
import Profile from "pages/student/Profile";
import Physics from "pages/student/Physics";
import Fp from "pages/student/FileUpload";
import tvprogramme from "pages/student/tvprogramme";
import NotFound404 from "pages/NotFound404";

// import { Role } from "utils/common";

export default function StudentRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/timetable" component={StudentTimeTable} />
        <Route exact path="/physics" component={Physics} />
        <Route exact path="/s" component={Fp} />
        <Route exact path="/tvprogramme" component={tvprogramme} />
        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
