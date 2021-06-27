import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Button } from "antd";

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
  }, []);

  const logout = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <div className="App">
      {currentUser && <Button onClick={logout}>logout</Button>}

      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} currentUser={currentUser} />}
          />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/dashboard"
            roles={[Role.SCHOOLADMIN, Role.STUDENT, Role.PRINCIPAl]}
            component={Dashboard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
