import { Route, Switch } from "react-router-dom";

import Dashboard from "pages/teacher/Dashboard";
import ApplyLeave from "pages/teacher/ApplyLeave";
import NotFound404 from "pages/NotFound404";
import SubPage from "pages/teacher/SubPage";
import ClassInCharge from "pages/teacher/ClassInCharge";
import VideoPage from "pages/VideoPage";
import SubmissionsPage from "pages/teacher/SubmissionsPage";
import AssessmentPage from "pages/teacher/AssessmentPage";
import Profile from "pages/student/Profile";

// import PrivateRoute from "utils/PrivateRoute";
// import { Role } from "utils/common";

export default function TeacherRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/subject/:sdid" component={SubPage} />
        <Route exact path="/assessment/:assid" component={AssessmentPage} />
        <Route
          exact
          path="/assessment/submisstions/:assid"
          component={SubmissionsPage}
        />
        <Route
          exact
          path="/resource/:secname/:name/:filename"
          component={VideoPage}
        />
        <Route exact path="/applyleave" component={ApplyLeave} />
        <Route exact path="/classincharge" component={ClassInCharge} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
