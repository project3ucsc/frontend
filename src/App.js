import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { Layout, Button, Avatar } from "antd";
import { LogoutOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

import Login from "pages/Login";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import { history, Role } from "utils/common";
import auth from "services/authentication.service";

import PrivateRoute from "utils/PrivateRoute";
import PublicRoute from "utils/PublicRoute";

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
              </Button>
              <span className="logtext">
                <Avatar size="small" icon={<UserOutlined />} />
                {currentUser.username}
              </span>
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
