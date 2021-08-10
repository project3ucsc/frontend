// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";
const schoolid = authenticationservice.currentUserValue.school_id;
const userid = authenticationservice.currentUserValue.id;

async function getTimeslotsSclAdmin(grade, classname) {
  try {
    const res = await axios.get(
      `${apiurl}/timeslot/${schoolid}/${grade}/${classname}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function getTimeSlotsForStudent() {
  try {
    console.log(userid);
    const res = await axios.get(
      `${apiurl}/timeslot/${schoolid}/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function addTimeslot(data) {
  try {
    const res = await axios.post(
      `${apiurl}/timeslot/${schoolid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function updateTimeslot(data, tsid) {
  try {
    const res = await axios.patch(
      `${apiurl}/timeslot/${schoolid}/${tsid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function deleteTimeslot(tsid) {
  try {
    const res = await axios.delete(`${apiurl}/timeslot/${tsid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const timeslotservice = {
  getTimeslotsSclAdmin,
  getTimeSlotsForStudent,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
};
export default timeslotservice;
