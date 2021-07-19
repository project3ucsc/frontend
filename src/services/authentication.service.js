// import React from 'react'
import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { apiurl } from "utils/common";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("user"))
);

const authenticationservice = {
  login,
  logout,
  register,
  getschools,
  currentuser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

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

function logout() {
  localStorage.removeItem("user");
  currentUserSubject.next(null);
}

export default authenticationservice;
