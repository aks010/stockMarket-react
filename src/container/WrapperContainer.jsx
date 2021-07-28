import React from "react";
import Navbar from "./Navbar";

import { Redirect } from "react-router";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminWrapperContainer from "./AdminWrapperContainer";
import UserWrapperContainer from "./UserWrapperContainer";
import LoginComponent from "../components/LoginComponent";
import {
  USER,
  ADMIN,
  GetUserRole,
  isUserAuthorized,
  LogoutUser,
} from "../globals/configs";
import CreateAccount from "../components/CreateAccount";

class WrapperContainer extends React.Component {
  state = {
    userRole: null,
    user: null,
  };

  componentDidMount() {
    if (isUserAuthorized()) {
      if (window.location.pathname == "/") {
        this.setState({ userRole: GetUserRole() });
        window.location.href = "/" + GetUserRole();
      }
    }
    this.setState({ userRole: GetUserRole() });
  }

  handleLogout = () => {
    console.log("Logging out");
    // window.localStorage.removeItem("role");
    LogoutUser();
    window.location.href = "/login";
  };

  render() {
    console.log(this.state.userRole);
    console.log(this.state.userRole == USER || this.state.userRole == ADMIN);
    return (
      <div>
        <Navbar
          userRole={this.state.userRole}
          handleLogout={this.handleLogout}
        />
        <div className="container">
          <Switch>
            <Route path="/admin">
              {this.state.userRole == ADMIN ? (
                <AdminWrapperContainer />
              ) : (
                <div>Unauthorized</div>
              )}
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/signup">
              <CreateAccount />
            </Route>
            <Route path="/user">
              {this.state.userRole == USER || this.state.userRole == ADMIN ? (
                <UserWrapperContainer />
              ) : (
                //todo
                <div>Redirect to login</div>
              )}
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WrapperContainer;
