import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

//  export const apiurl = "https://khubbackend.azurewebsites.net";

export const apiurl = "http://localhost:3001";

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

export const Role = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  PRINCIPAl: "PRINCIPAl",
  SCHOOLADMIN: "SCHOOLADMIN",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN",
};

export const Enum_subjectgroup = {
  COMP: "COMP",
  OPTIONAL_69: "OPTIONAL_69",
  OL_BUCKET_1: "OL_BUCKET_1",
  OL_BUCKET_2: "OL_BUCKET_2",
  OL_BUCKET_3: "OL_BUCKET_3",
  MATH_CHEM_IT: "MATH_CHEM_IT",
  BIO_PHY_AGRI: "BIO_PHY_AGRI",
  ART_BLA: "ART_BLA",
  COM_IT: "COM_IT",
  TECH_IT: "TECH_IT",
};

export const Enum_std_detail_status = {
  NO_ENROll: "NO_ENROll",
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
};

var datemap = new Map();
datemap.set(1, "Monday");
datemap.set(2, "Tuesday");
datemap.set(3, "Wednesday");
datemap.set(4, "Thursday");
datemap.set(5, "Friday");

var sectionmap = new Map();
sectionmap.set("G12MATH", "AL");
sectionmap.set("G12BIO", "AL");
sectionmap.set("G12ART", "AL");
sectionmap.set("G12TECH", "AL");
sectionmap.set("G12COM", "AL");
sectionmap.set("G13COM", "AL");
sectionmap.set("G13MATH", "AL");
sectionmap.set("G13BIO", "AL");
sectionmap.set("G13ART", "AL");
sectionmap.set("G13TECH", "AL");
sectionmap.set("G6", "69");
sectionmap.set("G7", "69");
sectionmap.set("G8", "69");
sectionmap.set("G9", "69");
sectionmap.set("G10", "OL");
sectionmap.set("G11", "OL");
sectionmap.set("G1", "PRIMARY");
sectionmap.set("G2", "PRIMARY");
sectionmap.set("G3", "PRIMARY");
sectionmap.set("G4", "PRIMARY");
sectionmap.set("G5", "PRIMARY");

export function getDaybyNumber(day) {
  return datemap.get(day);
}

export function getSectionFromGrade(grade) {
  return sectionmap.get(grade);
}
