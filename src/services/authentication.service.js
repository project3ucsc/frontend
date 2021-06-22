// import React from 'react'
import axios from "axios";
import { history } from "../utils/common";

export const authenticationservice = {
  login,
  logout,
};

export const getSessionData = () => {
  const data = localStorage.getItem("user");
  if (data) return JSON.parse(data);
  else return null;
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:3002/login", { username, password })
      .then((res) => {
        const data = JSON.stringify(res.data);
        localStorage.setItem("user", data);

        resolve(res.data);
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
  history.push("/login");
}
