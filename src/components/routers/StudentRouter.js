// import PrivateRoute from "utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/student/Dashboard";
import StudentTimeTable from "pages/student/StudentTimeTable";
import Profile from "pages/student/Profile";
import Subpage from "pages/student/Subpage";
import tvprogramme from "pages/student/tvprogramme";
import NotFound404 from "pages/NotFound404";
import EnrollPage from "pages/student/EnrollPage";
import VideoPage from "pages/VideoPage";
import AssessmentStuPage from "pages/student/AssessmentStuPage";

// import { Role } from "utils/common";

export default function StudentRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/subject" component={EnrollPage} />
        <Route exact path="/subject/:sdid" component={Subpage} />
        <Route exact path="/assessment/:assid" component={AssessmentStuPage} />
        <Route
          exact
          path="/resource/:secname/:name/:filename"
          component={VideoPage}
        />
        <Route exact path="/timetable" component={StudentTimeTable} />
        <Route exact path="/tvprogramme" component={tvprogramme} />
        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
