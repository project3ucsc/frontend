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
    if (err.response.status === 500)
      throw new Error("Usename or password incorrect");
    else if (err.response.status === 401)
      throw new Error("Authentication Failed");
    else throw new Error("Unknown error occured");
  }

  // console.log(err.response.data);
}

async function register(data) {
  try {
    const res = await axios.post(apiurl + "/login/register", data);
    const d = JSON.stringify(res.data);
    return d;
  } catch (err) {
    if (err.response.status === 500) throw new Error("Email already exists");
    else if (err.response.status === 401)
      throw new Error("Authentication Failed");
    else throw new Error("Unknown error occured");
  }
}

async function getschools() {
  try {
    const res = axios.get(apiurl + "/login/register/school");
    return res.data;
  } catch (err) {
    throw new Error("Failed to load");
  }
}

function logout() {
  localStorage.removeItem("user");
  currentUserSubject.next(null);
}

export default authenticationservice;
