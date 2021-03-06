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
async function addnewClasses(data) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.post(
      `${apiurl}/classes/addclass/${schoolid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function setClassteacher(classid, teacherid) {
  try {
    const res = await axios.patch(
      `${apiurl}/classes/setClassteacher`,
      { classid, teacherid },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getClass(classid) {
  try {
    const res = await axios.get(`${apiurl}/classes/${classid}`, authHeader());
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

async function getsStudentEnrollStatus() {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/enrollStatus/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getEnrolledStudents() {
  const userid = authenticationservice.currentUserValue.id;
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/EnrolledStudents/${userid}/${schoolid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function setStdStatus(stdid, status) {
  try {
    const res = await axios.patch(
      `${apiurl}/classes/setStdStatus`,
      { stdid, status },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function enrollStudent(data) {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.post(
      `${apiurl}/classes/enroll/${userid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function unenrollStudent(classid) {
  try {
    const userid = authenticationservice.currentUserValue.id;

    const res = await axios.delete(
      `${apiurl}/classes/unenroll/${classid}/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getStudentDetail(stdid) {
  try {
    const res = await axios.get(
      `${apiurl}/classes/getStudentDetail/${stdid}`,
      authHeader()
    );
    return res.data;
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

async function getSDsinClass(grade, name) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/getSDsinClass/${schoolid}/${grade}/${name}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getSubDetailsforTeacher() {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/getSubDetailsforTeacher/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getSubDetailsforStudent() {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/getSubDetailsforStudent/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getSubDetailsForStudentDash() {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/classes/getSubDetailsforStudent/dash/${userid}`,
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
  getClass,
  CreateConfigureClasses,
  addnewClasses,
  setClassteacher,
  getSubDetailsforTeacher,
  getSubDetailsforStudent,
  getSDsinClass,
  getStudentDetail,
  getsection_and_no_classes,
  getsStudentEnrollStatus,
  getEnrolledStudents,
  setStdStatus,
  enrollStudent,
  unenrollStudent,
  getclassdetails,
  addSubjectDetail,
  removeSubjectDetail,
  updateSubjectDetail,
  getSubDetailsForStudentDash,
};
export default classroomservice;
