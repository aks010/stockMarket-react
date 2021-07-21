import React from "react";
import AddNewExchange from "./AddNewExchange";
import ListExchanges from "./ListExchanges";
import UpdateExchange from "./UpdateExchange";
import { Switch, Route } from "react-router-dom";

class ManageCompany extends React.Component {
  render() {
    console.log("HELLP");
    console.log(this.props);
    let currPath = "/admin/exchange";
    return (
      <div>
        <Switch>
          <Route path={`${currPath}/new`}>
            <AddNewExchange />
          </Route>
          <Route path={`${currPath}/update/:exchangeName`}>
            <UpdateExchange />
          </Route>
          <Route path={`${currPath}/list`}>
            <ListExchanges />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ManageCompany;
