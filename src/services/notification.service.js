// import React from 'react'
import axios from "axios";
import { authHeader } from "utils/authheader";
import { apiurl } from "utils/common";
import authenticationservice from "./authentication.service";

async function getNotifications() {
  const uid = authenticationservice.currentUserValue.id;

  try {
    const res = await axios.get(`${apiurl}/notification/${uid}`, authHeader());
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error(err.response.data.message);
  }
}
async function addNotification(title, discription, to, onClickTo, type) {
  try {
    const res = await axios.post(
      `${apiurl}/notification`,
      { title, discription, to, onClickTo, type },
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// async function updatePeriodSlot(data, psid) {
//   try {
//     const res = await axios.patch(
//       `${apiurl}/period/${psid}`,
//       data,
//       authHeader()
//     );
//     return res.data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// }

async function deleteNotification(id) {
  try {
    const res = await axios.delete(
      `${apiurl}/notification/${id}`,
      authHeader()
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

const notificationservice = {
  getNotifications,
  addNotification,
  deleteNotification,
};
export default notificationservice;
