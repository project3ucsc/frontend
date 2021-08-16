import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

//  export const apiurl = "https://khubbackend.azurewebsites.net";

export const apiurl = "http://localhost:3001";

export const Role = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PRINCIPAl: "PRINCIPAl",
  SCHOOLADMIN: "SCHOOLADMIN",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN",
};

export function getDateTxt(starttime, endtime) {
  const timeoptions = {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  };
  let st = new Date(starttime);
  let et = new Date(endtime);
  return `${st.toLocaleTimeString([], timeoptions)} - ${et.toLocaleTimeString(
    [],
    timeoptions
  )}`;
}
