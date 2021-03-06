// import PrivateRoute from "utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import SAdminDashboard from "pages/scladmin/SAdminDashboard";
import ClassRoomManagePage from "pages/scladmin/ClassRoomManagePage";
import SectionManagePage from "pages/scladmin/SectionManagePage";
import TimeSlotManagePage from "pages/scladmin/TimeSlotManagePage";
import TimeTableManagePage from "pages/scladmin/TimeTableManagePage";
import ViewTutorRequestPage from "pages/scladmin/ViewTutorRequestPage";
import ManageUsers from "pages/scladmin/ManageUsers";
import NewTeacherReq from "pages/scladmin/NewTeacherReq";

import NotFound404 from "pages/NotFound404";
import StudentMangament from "pages/scladmin/StudentMangament";
import Profile from "pages/student/Profile";

// import { Role } from "utils/common";

export default function SAdiminRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={SAdminDashboard} />
        <Route exact path="/managesections" component={SectionManagePage} />
        <Route exact path="/manageclasses" component={ClassRoomManagePage} />
        <Route exact path="/timeslots" component={TimeSlotManagePage} />
        <Route exact path="/timetables" component={TimeTableManagePage} />
        <Route exact path="/manageuser" component={ManageUsers} />
        <Route exact path="/TeacherManagement" component={NewTeacherReq} />
        <Route exact path="/StudentManagement" component={StudentMangament} />
        <Route exact path="/TutorManagement" component={ViewTutorRequestPage} />
        <Route exact path="/profile" component={Profile} />

        <Route component={NotFound404} />
      </Switch>
    </>
  );
}
