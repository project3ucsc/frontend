// import React from 'react'
import axios from "axios";
import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("user"))
);

const authenticationservice = {
  login,
  logout,
  register,
  currentuser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("https://knowledge-hub-backend.azurewebsites.net/login", {
        username,
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
      .post(
        "https://knowledge-hub-backend.azurewebsites.net/login/register",
        data
      )
      .then((res) => {
        const data = JSON.stringify(res.data);
        resolve(data);
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

function logout() {
  localStorage.removeItem("user");
  currentUserSubject.next(null);
}

export default authenticationservice;
