// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getTimeslotsSclAdmin(grade, classname) {
  const schoolid = authenticationservice.currentUserValue.school_id;

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
  const schoolid = authenticationservice.currentUserValue.school_id;
  const userid = authenticationservice.currentUserValue.id;

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

async function getTimeSlotsForTeacher() {
  const userid = authenticationservice.currentUserValue.id;

  try {
    console.log(userid);
    const res = await axios.get(`${apiurl}/timeslot/${userid}`, authHeader());
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function addTimeslot(data) {
  const schoolid = authenticationservice.currentUserValue.school_id;

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
  const schoolid = authenticationservice.currentUserValue.school_id;

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
  getTimeSlotsForTeacher,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
};
export default timeslotservice;
