// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getAssmnts(sdid) {
  try {
    const res = await axios.get(`${apiurl}/assmnt/all/${sdid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getAssmntByID(assid) {
  try {
    const res = await axios.get(`${apiurl}/assmnt/${assid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getAssmntByIdWithSubmisstion(assid) {
  try {
    const stuid = authenticationservice.currentUserValue.id;

    const res = await axios.get(
      `${apiurl}/assmnt/attach/${assid}/${stuid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function addAssmnt(data) {
  try {
    const res = await axios.post(`${apiurl}/assmnt`, data, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function updateAssmnt(assid, property, value) {
  try {
    const res = await axios.patch(
      `${apiurl}/assmnt`,
      { assid, property, value },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function deleteAssmnt(psid) {
  try {
    const res = await axios.delete(`${apiurl}/assmnt/${psid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getSubmissions(assid) {
  try {
    const res = await axios.get(
      `${apiurl}/assmnt/submission/all/${assid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function upsertSubmission(dbid, filename) {
  try {
    const stuid = authenticationservice.currentUserValue.id;
    const assid = parseInt(dbid.split(".")[0]);
    const subid = parseInt(dbid.split(".")[1]);
    const res = await axios.put(
      `${apiurl}/assmnt/submission`,
      { subid, assid, stuid, filename },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const assmntservice = {
  getAssmnts,
  getAssmntByID,
  getAssmntByIdWithSubmisstion,
  addAssmnt,
  updateAssmnt,
  getSubmissions,
  upsertSubmission,
  deleteAssmnt,
};
export default assmntservice;
