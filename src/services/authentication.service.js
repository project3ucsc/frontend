// import React from 'react'
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("user"))
);

async function login(email, password) {
  try {
    const res = await axios.post(apiurl + "/login", { email, password });
    console.log(res);
    const data = JSON.stringify(res.data);
    localStorage.setItem("user", data);
    currentUserSubject.next(res.data);
    return res.data;
  } catch (err) {
    // console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }

  // console.log(err.response.data);
}

async function register(data) {
  try {
    const res = await axios.post(apiurl + "/login/register", data);
    const d = JSON.stringify(res.data);
    return d;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function getschools() {
  try {
    const res = await axios.get(apiurl + "/login/register/school");
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

async function setAccountStatus(status, userid) {
  try {
    const res = await axios.patch(
      `${apiurl}/login/activate`,
      { userid, status },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getPendingNAciveAccounts(role) {
  try {
    const schoolid = authenticationservice.currentUserValue.school_id;

    const res = await axios.get(
      `${apiurl}/login/acc/${role}/${schoolid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getUserDetail(userid) {
  try {
    const res = await axios.get(`${apiurl}/user/${userid}`, authHeader());
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
async function getPrincipalDetail(userid) {
  try {
    const res = await axios.get(
      `${apiurl}/user/principal/${userid}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("tclsname");
  localStorage.removeItem("clsname");
  localStorage.removeItem("enroldata");

  currentUserSubject.next(null);
}

const authenticationservice = {
  login,
  logout,
  register,
  getschools,
  getPendingNAciveAccounts,
  setAccountStatus,
  getUserDetail,
  getPrincipalDetail,
  currentuser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export default authenticationservice;
