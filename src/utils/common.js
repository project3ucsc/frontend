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
  REJECTED: "REJECTED",
};

export const enum_BtnState = {
  dirty: "d",
  success: "s",
  err: "e",
};

export const enum_submissionStatus = {
  noattempt: "na",
  submitearly: "se",
  submitlate: "ls",
};

export const enum_releifStatus = {
  pending: "a",
  active: "b",
  rejected: "c",
  expried: "d",
};
export const enum_tutorschool_req = {
  pending: "a",
  active: "b",
  rejected: "c",
};

export const enum_payment = {
  notpaid: "a",
  paid: "b",
  accepted: "c",
  rejected: "d",
}

export const spinStyle = { style: { marginLeft: "35vw", marginTop: "20vh" } };

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

var subdispmap = new Map();
subdispmap.set("OPTIONAL_69", "Aesthetic Subject");
subdispmap.set("OL_BUCKET_1", "Bucket 1 subject");
subdispmap.set("OL_BUCKET_2", "Bucket 2 subject");
subdispmap.set("OL_BUCKET_3", "Bucket 3 subject");
subdispmap.set("MATH_CHEM_IT", "Optional Subject");
subdispmap.set("BIO_PHY_AGRI", "Optional Subject");
subdispmap.set("ART_BLA", "Optional Subject");
subdispmap.set("COM_IT", "Optional Subject");
subdispmap.set("TECH_IT", "Optional Subject");

export function getDaybyNumber(day) {
  return datemap.get(day);
}

export function getSectionFromGrade(grade) {
  return sectionmap.get(grade);
}

export function getSubGroupDiscription(sub) {
  return subdispmap.get(sub);
}

export function getClassName() {
  let name = localStorage.getItem("clsname");
  if (name) return name;
  else return "";
}

export function getClassNameTea() {
  let name = localStorage.getItem("tclsname");
  if (name) return name;
  else return "";
}

export function getTimeAgo(subdate, now, prefix) {
  var dYrs = now.getFullYear() - subdate.getFullYear();
  var dMonths = now.getMonth() - subdate.getMonth();
  var dDays = now.getDate() - subdate.getDate();
  var dHours = now.getHours() - subdate.getHours();
  var dMins = now.getMinutes() - subdate.getMinutes();

  let txt = "";

  if (dYrs === 0)
    if (dMonths === 0)
      if (dDays === 0)
        if (dHours === 0) txt = `${dMins} minutes`;
        else txt = `${dHours} hours`;
      else txt = `${dDays} days`;
    else txt = `${dMonths} months`;
  else txt = `${dYrs} hours`;
  if (prefix) {
    if (txt.charAt(0) === "-") txt = "after " + txt.substring(1);
    else txt = "before " + txt;
  }
  // console.log(txt);

  return txt;

  // console.log("yr " + dYrs);
  // console.log("mon " + dMonths);
  // console.log("day " + dDays);
  // console.log("h " + dHours);
  // console.log("m " + dMins);
}
