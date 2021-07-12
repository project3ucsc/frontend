import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { Layout, Button, Avatar } from "antd";
import { LogoutOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import MainUserRouter from "components/routers";
import { history } from "utils/common";
import auth from "services/authentication.service";

import SideBar from "components/SideBars";
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

        <Layout>
          <Router history={history}>
            <SideBar />

            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} />} />

              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute
                exact
                path="/forgot-password"
                component={ForgotPass}
              />
              <PublicRoute exact path="/register" component={Register} />
              <MainUserRouter />
            </Switch>
          </Router>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
