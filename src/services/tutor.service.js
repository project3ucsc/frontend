// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getClassListForTutor() {
  try {
    const uid = authenticationservice.currentUserValue.id;
    const res = await axios.get(
      `${apiurl}/tutor/classes/list/${uid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function getClassListForStudent() {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/tutor/classes/stu/${schoolid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}

async function addPeriodSlot(data) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.post(
      `${apiurl}/tutor/classes/stu/${schoolid}`,
      { ...data, school_id: schoolid },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const tutorservice = {
  getClassListForTutor,
  getClassListForStudent,
};
export default tutorservice;
