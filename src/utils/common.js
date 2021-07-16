import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

//  export const apiurl = "https://knowledge-hub-backend.azurewebsites.net";
export const apiurl = "http://localhost:3001";

export const Role = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PRINCIPAl: "PRINCIPAl",
  SCHOOLADMIN: "SCHOOLADMIN",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN",
};
