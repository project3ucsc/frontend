// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function CreateConfigureClasses(data) {
  try {
    const res = await axios.post(
      `${apiurl}/classes/addall/${authenticationservice.currentUserValue.school_id}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getsection_and_no_classes() {
  try {
    const res = await axios.get(
      `${apiurl}/classes/num/${authenticationservice.currentUserValue.school_id}`,
      authHeader()
    );
    return res.data.schoolsectiondetail;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getclassdetails(grade, name) {
  try {
    const res = await axios.get(
      `${apiurl}/classes/getdetails/${authenticationservice.currentUserValue.school_id}/${grade}/${name}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const classroomservice = {
  CreateConfigureClasses,
  getsection_and_no_classes,
  getclassdetails,
};
export default classroomservice;
