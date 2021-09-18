// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getSubDetailAllDataforTeacher(sdid) {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/tutorsubject/teacher/${sdid}/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getSubDetailAllDataforStudent(sdid) {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/tutorsubject/student/${sdid}/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function addResouceSection(sdid, title) {
  try {
    const res = await axios.post(
      `${apiurl}/tutorsubject/section`,
      { sdid, title },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function deleteResouceSection(secid) {
  try {
    const res = await axios.delete(
      `${apiurl}/tutorsubject/section/${secid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function addResouce(data) {
  console.log(data);
  try {
    const res = await axios.post(
      `${apiurl}/tutorsubject/resource`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function deleteResouce(resid) {
  try {
    const res = await axios.delete(
      `${apiurl}/tutorsubject/resource/${resid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function updateResouceName(data) {
  try {
    const res = await axios.patch(
      `${apiurl}/tutorsubject/resource`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getMeetingDetailsforStudent(sdid, day) {
  try {
    const res = await axios.get(
      `${apiurl}/tutorsubject/getMeetingDetailsforStudent/${sdid}/${day}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getMeetingDetails(sdid, day) {
  try {
    const res = await axios.get(
      `${apiurl}/tutorsubject/getMeetingDetails/${sdid}/${day}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function editMeetingUrl(tsid, url) {
  try {
    const res = await axios.patch(
      `${apiurl}/tutorsubject/editMeetingUrl`,
      { tsid, url },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const tutorsubjectservice = {
  getSubDetailAllDataforTeacher,
  getSubDetailAllDataforStudent,
  addResouceSection,
  deleteResouceSection,
  addResouce,
  deleteResouce,
  updateResouceName,
  getMeetingDetails,
  getMeetingDetailsforStudent,
  editMeetingUrl,
};
export default tutorsubjectservice;
