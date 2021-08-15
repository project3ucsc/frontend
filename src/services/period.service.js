// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getPeriodSlots(level) {
  const schoolid = authenticationservice.currentUserValue.school_id;

  try {
    const res = await axios.get(
      `${apiurl}/period/${schoolid}/${level}`,
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
      `${apiurl}/period`,
      { ...data, school_id: schoolid },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function updatePeriodSlot(data, psid) {
  try {
    const res = await axios.patch(
      `${apiurl}/period/${psid}`,
      data,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function deletePeriodSlot(psid) {
  try {
    const res = await axios.delete(`${apiurl}/period/${psid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const periodservice = {
  getPeriodSlots,
  addPeriodSlot,
  updatePeriodSlot,
  deletePeriodSlot,
};
export default periodservice;
