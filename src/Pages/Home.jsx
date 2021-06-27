import React from "react";
// import { history } from "./utils/common";
import { Button } from "antd";

export default function Home({ history, currentUser }) {
  return (
    <div>
      {!currentUser && (
        <Button
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      )}
      <h1>Home</h1>
    </div>
  );
}
