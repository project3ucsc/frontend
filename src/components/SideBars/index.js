import auth from "services/authentication.service";

import { Role } from "utils/common";

import SystemAdminSideBar from "./SystemAdminSideBar";
import SAdminSideBar from "./SAdminSideBar";
import StudentSideBar from "./StudentSideBar";
import TeacherSideBar from "./TeacherSideBar";
import PrincipalSideBar from "./PrincipalSideBar";

export default function SideBar() {
  if (auth.currentUserValue) {
    const currentrole = auth.currentUserValue.role;
    if (currentrole === Role.STUDENT) {
      return <StudentSideBar />;
    }

    if (currentrole === Role.TEACHER) {
      return <TeacherSideBar />;
    }
    if (currentrole === Role.PRINCIPAl) {
      return <PrincipalSideBar />;
    }
    if (currentrole === Role.SCHOOLADMIN) {
      return <SAdminSideBar />;
    }
    if (currentrole === Role.ADMIN) {
      return <SystemAdminSideBar />;
    }
  }

  return <></>;
}
