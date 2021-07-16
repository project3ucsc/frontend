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

function login(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiurl + "/login", {
        email,
        password,
      })
      .then((res) => {
        const data = JSON.stringify(res.data);
        localStorage.setItem("user", data);
        currentUserSubject.next(res.data);
        resolve();
      })
      .catch((err) => {
        if (err.response.status === 500)
          reject(new Error("Usename or password incorrect"));
        else if (err.response.status === 401)
          reject(new Error("Authentication Failed"));
        else reject(new Error("Unknown error occured"));
        // console.log(err.response.data);
      });
  });
}

function register(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiurl + "/login/register", data)
      .then((res) => {
        const data = JSON.stringify(res.data);
        resolve(data);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log(err.response);
          reject(new Error("Email already exists"));
        } else if (err.response.status === 401)
          reject(new Error("Authentication Failed"));
        else reject(new Error("Unknown error occured"));
        // console.log(err.response.data);
      });
  });
}

function getschools() {
  return new Promise((resolve, reject) => {
    axios
      .get(apiurl + "/login/register/school")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(new Error("Failed to load"));
      });
  });
}

function logout() {
  localStorage.removeItem("user");
  currentUserSubject.next(null);
}

export default authenticationservice;
