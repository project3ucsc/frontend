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

export function getDateTxt(starttime, endtime, hourCycle) {
  const timeoptions = {
    hourCycle: hourCycle,
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

var datemap = new Map();
datemap.set(1, "Monday");
datemap.set(2, "Tuesday");
datemap.set(3, "Wednesday");
datemap.set(4, "Thursday");
datemap.set(5, "Friday");

export function getDaybyNumber(day) {
  return datemap.get(day);
}
