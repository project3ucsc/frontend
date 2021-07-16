import { createBrowserHistory } from "history";

export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export const history = createBrowserHistory();
// export const apiurl = "https://knowledge-hub-backend.azurewebsites.net";
export const apiurl = "http://localhost:3001";

export const Role = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PRINCIPAl: "PRINCIPAl",
  SCHOOLADMIN: "SCHOOLADMIN",
  ADMIN: "ADMIN",
};
