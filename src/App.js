import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { Layout, Button } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";

import Login from "Pages/Login";
import Home from "Pages/Home";
import Dashboard from "Pages/Dashboard";
import { history, Role } from "Utils/common";
import auth from "Services/authentication.service";

import PrivateRoute from "Utils/PrivateRoute";
import PublicRoute from "Utils/PublicRoute";

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.currentuser.subscribe((v) => {
      setCurrentUser(v);
    });
    // return function cleanup() {
    //   auth.currentuser.unsubscribe();
    // };
  }, []);

  const logout = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <div className="App">
      <Layout className="MainLayout">
        <Layout.Header className="header">
          <div className="logo"> KNOWLEDGEHUB </div>

          {currentUser ? (
            <>
              <Button type="default" className="logoutbtn" onClick={logout}>
                <LogoutOutlined />
              </Button>{" "}
              <span className="logtext">{currentUser.username}</span>
            </>
          ) : (
            <>
              <Button
                type="default"
                className="logoutbtn"
                onClick={() => history.push("/login")}
              >
                <LoginOutlined />
              </Button>{" "}
              <span className="logtext"> You are not logged in</span>
            </>
          )}
        </Layout.Header>

        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/dashboard"
              roles={[Role.SCHOOLADMIN, Role.STUDENT, Role.PRINCIPAl]}
              component={Dashboard}
            />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
