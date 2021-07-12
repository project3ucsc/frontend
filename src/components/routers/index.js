import auth from "services/authentication.service";
import { Route } from "react-router-dom";

import { Role } from "utils/common";
import NotAuth403 from "pages/NotAuth403";

import StudentRouter from "./StudentRouter";
import TeacherRouter from "./TeacherRouter";
import SAdiminRouter from "./SAdiminRouter";

export default function MainUserRouter() {
  if (auth.currentUserValue) {
    const currentrole = auth.currentUserValue.role;
    if (currentrole === Role.STUDENT) {
      return <StudentRouter />;
    }

    if (currentrole === Role.TEACHER) {
      return <TeacherRouter />;
    }
    if (currentrole === Role.PRINCIPAl) {
      return <StudentRouter />;
    }
    if (currentrole === Role.SCHOOLADMIN) {
      return <SAdiminRouter />;
    }
    if (currentrole === Role.ADMIN) {
      return <StudentRouter />;
    }
  }

  return <Route component={NotAuth403} />;
}
