// import PrivateRoute from "utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import Dashboard from "pages/student/Dashboard";
import StudentTimeTable from "pages/student/StudentTimeTable";
import Profile from "pages/student/Profile";
import Subpage from "pages/student/Subpage";
import Tvprogramme from "pages/student/Tvprogramme";
import NotFound404 from "pages/NotFound404";
import EnrollPage from "pages/student/EnrollPage";
import VideoPage from "pages/VideoPage";

import TuitionHome from "pages/student/TuitionHome";

import AssessmentStuPage from "pages/student/AssessmentStuPage";
import PSubpage from "pages/student/PSubpage";
import PAssessmentStuPage from "pages/student/PAssessmentStuPage";

// import { Role } from "utils/common";

export default function StudentRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/subject" component={EnrollPage} />
        <Route exact path="/subject/:sdid" component={Subpage} />
        {/* <Route exact path="/TuitionHome/:id" component={SubjectPage} /> */}
        <Route exact path="/assessment/:assid" component={AssessmentStuPage} />

        <Route exact path="/tution/subject/:sdid" component={PSubpage} />
        {/* <Route exact path="/TuitionHome/:id" component={SubjectPage} /> */}
        <Route
          exact
          path="/tution/assessment/:assid"
          component={PAssessmentStuPage}
        />

        <Route
          exact
          path="/resource/:secname/:name/:filename"
          component={VideoPage}
        />
        <Route exact path="/timetable" component={StudentTimeTable} />
        <Route exact path="/tvprogramme" component={Tvprogramme} />

        <Route exact path="/TuitionHome" component={TuitionHome} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
