import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { Layout, Button, Avatar } from "antd";
import { LogoutOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import NotFound404 from "pages/NotFound404";
import { history, Role } from "utils/common";
import auth from "services/authentication.service";

import PrivateRoute from "utils/PrivateRoute";
import PublicRoute from "utils/PublicRoute";
import ForgotPass from "pages/ForgotPass";

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
          <div className="logo" onClick={() => history.push("/dashboard")}>
            KNOWLEDGEHUB
          </div>

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
            <PublicRoute exact path="/forgot-password" component={ForgotPass} />
            <PublicRoute exact path="/register" component={Register} />
            <PrivateRoute
              exact
              path="/dashboard"
              roles={[Role.SCHOOLADMIN, Role.STUDENT, Role.PRINCIPAl]}
              component={Dashboard}
            />

            {/* default route */}
            <Route component={NotFound404} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
