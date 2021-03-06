import React from "react";
import AddNewIPO from "./AddNewIPO";
import ListIPOs from "./ListIPOs";
import UpdateIPO from "./UpdateIPO";
import { Switch, Route } from "react-router-dom";
import IPOExchange from "./IPOExchange";

class ManageIPO extends React.Component {
  render() {
    console.log("HELLP");
    console.log(this.props);
    let currPath = "/admin/ipo";
    return (
      <div>
        <Switch>
          <Route path={`${currPath}/new`}>
            <AddNewIPO />
          </Route>
          <Route path={`${currPath}/update/:exchangeName`}>
            <UpdateIPO />
          </Route>
          <Route path={`${currPath}/list`}>
            <ListIPOs />
          </Route>
          <Route path={`${currPath}/exchange/:companyName`}>
            <IPOExchange />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ManageIPO;
