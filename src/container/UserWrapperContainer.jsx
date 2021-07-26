import React from "react";
import Navbar from "./Navbar";

import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import CompareCompany from "../components/userComponents/CompareCompany";
import IPOs from "../components/userComponents/IPOs";
import ExchangeList from "../components/userComponents/ExchangeList";
import CompanyList from "../components/userComponents/CompanyList";

class UserWrapperContainer extends React.Component {
  componentDidMount() {
    // fetch role
  }

  render() {
    return (
      <div class="mt-5">
        <Switch>
          <Route path={`/user/compare/company`}>
            <CompareCompany />
          </Route>
          <Route path={`/user/ipos`}>
            <IPOs />
          </Route>
          <Route path={`/user/exchanges`}>
            <ExchangeList />
          </Route>
          <Route path={`/user/companies`}>
            <CompanyList />
          </Route>
          <Route path={`/user/`}>
            <IPOs />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default UserWrapperContainer;
