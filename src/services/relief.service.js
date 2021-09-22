// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function addleave(data) {
  try {
    const schoolid = authenticationservice.currentUserValue.school_id;
    const userid = authenticationservice.currentUserValue.id;
    const res = await axios.post(
      `${apiurl}/relief/`,
      { ...data, schoolid, userid },
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function addleaveNreleif(data) {
  try {
    const schoolid = authenticationservice.currentUserValue.school_id;
    const res = await axios.post(
      `${apiurl}/relief/addleaveNreleif`,
      { ...data, schoolid },
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function getTimeslotsFortheDay(day) {
  try {
    console.log(day);
    const userid = authenticationservice.currentUserValue.id;
    const res = await axios.get(
      `${apiurl}/relief/timeslotsday/${userid}/${day}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function getAllReleifs() {
  try {
    const userid = authenticationservice.currentUserValue.id;
    const res = await axios.get(`${apiurl}/relief/all/${userid}`, authHeader());
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function getReleif(relid) {
  try {
    const res = await axios.get(`${apiurl}/relief/${relid}`, authHeader());
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function getReleifSdid(relid) {
  try {
    const res = await axios.get(`${apiurl}/relief/sdid/${relid}`, authHeader());
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function setStatus(id, status) {
  try {
    const res = await axios.patch(
      `${apiurl}/relief/status`,
      { id, status },
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function checkRelifinStudent(tsid, sdid) {
  try {
    const res = await axios.get(
      `${apiurl}/relief/checkRelifinStudent/${sdid}/${tsid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

const reliefservice = {
  addleaveNreleif,
  getTimeslotsFortheDay,
  getAllReleifs,
  getReleif,
  getReleifSdid,
  setStatus,
  checkRelifinStudent,
  addleave,
};
export default reliefservice;
