// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function CreateConfigureClasses(data) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.post(
      `${apiurl}/classes/addall/${schoolid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getsection_and_no_classes() {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/num/${schoolid}`,
      authHeader()
    );
    return res.data.schoolsectiondetail;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getclassdetails(grade, name) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/getdetails/${schoolid}/${grade}/${name}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function addSubjectDetail(subject, teacher, classroomid) {
  try {
    const res = await axios.post(
      `${apiurl}/classes/subjectdetail`,
      { classroomid, subject, teacher },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function removeSubjectDetail(sdid) {
  try {
    const res = await axios.delete(
      `${apiurl}/classes/subjectdetail/${sdid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function updateSubjectDetail(data, sdid) {
  try {
    const res = await axios.patch(
      `${apiurl}/classes/subjectdetail/${sdid}`,
      data,
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
  addSubjectDetail,
  removeSubjectDetail,
  updateSubjectDetail,
};
export default classroomservice;
