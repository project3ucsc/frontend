import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  getSessionData,
  authenticationservice,
} from "./services/authentication.service";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      {getSessionData() ? (
        <Button onClick={authenticationservice.logout}>logout</Button>
      ) : (
        <Button>
          <Link to="/login">login</Link>
        </Button>
      )}
    </div>
  );
}
