import React from "react";
import Navbar from "./Navbar";

import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import CompareCompany from "../components/userComponents/CompareCompany";
import CompareSectors from "../components/userComponents/CompareSectors";
import IPOs from "../components/userComponents/IPOs";
import Other from "../components/userComponents/Other";

class UserWrapperContainer extends React.Component {
  componentDidMount() {
    // fetch role
  }

  render() {
    return (
      <div>
        USER
        <Switch>
          <Route path={`/user/compare/company`}>
            <CompareCompany />
          </Route>
          <Route path={`/user/compare/sectors`}>
            <CompareSectors />
          </Route>
          <Route path={`/user/ipos`}>
            <IPOs />
          </Route>
          <Route path={`/user/others`}>
            <Other />
          </Route>
          <Router path="/user">{/* <UserWrapperContainer /> */}</Router>
        </Switch>
      </div>
    );
  }
}

export default UserWrapperContainer;