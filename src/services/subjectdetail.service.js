// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getSubDetailAllDataforTeacher(sdid, isRel) {
  const userid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(
      `${apiurl}/subjectdetail/teacher/${sdid}/${userid}/${isRel}`,
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
      `${apiurl}/subjectdetail/student/${sdid}/${userid}`,
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
      `${apiurl}/subjectdetail/section`,
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
      `${apiurl}/subjectdetail/section/${secid}`,
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
      `${apiurl}/subjectdetail/resource`,
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
      `${apiurl}/subjectdetail/resource/${resid}`,
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
      `${apiurl}/subjectdetail/resource`,
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
      `${apiurl}/subjectdetail/getMeetingDetailsforStudent/${sdid}/${day}`,
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
      `${apiurl}/subjectdetail/getMeetingDetails/${sdid}/${day}`,
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
      `${apiurl}/subjectdetail/editMeetingUrl`,
      { tsid, url },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const subjectdetailservice = {
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
export default subjectdetailservice;
