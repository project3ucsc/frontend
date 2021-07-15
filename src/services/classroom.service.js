// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

function CreateConfigureClasses(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        apiurl +
          "/classes/addall/" +
          authenticationservice.currentUserValue.school_id,
        data,
        authHeader()
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        console.log(e);
        reject(new Error("Somethingwent wrong"));
      });
  });
}
function getsection_and_no_classes() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        apiurl +
          "/classes/num/" +
          authenticationservice.currentUserValue.school_id,
        authHeader()
      )
      .then((res) => {
        resolve(res.data.schoolsectiondetail);
      })
      .catch((e) => {
        console.log(e);
        reject(new Error("Somethingwent wrong"));
      });
  });
}

function getclassdetails(grade, name) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        apiurl +
          `/classes/getdetails/${authenticationservice.currentUserValue.school_id}/${grade}/${name}
          `,
        authHeader()
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        console.log(e);
        reject(new Error("Somethingwent wrong"));
      });
  });
}

const classroomservice = {
  CreateConfigureClasses,
  getsection_and_no_classes,
  getclassdetails,
};
export default classroomservice;
