import auth from "services/authentication.service";

import { Role } from "utils/common";

import SAdminSideBar from "./SAdminSideBar";
import StudentSideBar from "./StudentSideBar";

export default function SideBar() {
  if (auth.currentUserValue) {
    const currentrole = auth.currentUserValue.role;
    if (currentrole === Role.STUDENT) {
      return <StudentSideBar />;
    }

    if (currentrole === Role.TEACHER) {
      return <StudentSideBar />;
    }
    if (currentrole === Role.PRINCIPAl) {
      return <StudentSideBar />;
    }
    if (currentrole === Role.SCHOOLADMIN) {
      return <SAdminSideBar />;
    }
    if (currentrole === Role.ADMIN) {
      return <StudentSideBar />;
    }
  }

  return <></>;
}
