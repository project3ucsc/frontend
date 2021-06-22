import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  getSessionData,
  authenticationservice,
} from "./services/authentication.service";

export default function Dashboard() {
  const session = getSessionData();

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <h2>Welcome {session.username} </h2> */}
      {session ? (
        <Button onClick={authenticationservice.logout}>logout</Button>
      ) : (
        <Button>
          <Link to="/login">login</Link>
        </Button>
      )}
    </div>
  );
}
