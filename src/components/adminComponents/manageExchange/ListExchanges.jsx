import React from "react";
import { Link } from "react-router-dom";
import API2 from "../../../Api2";
import API1 from "../../../Api2";

class ListExchanges extends React.Component {
  state = {
    exchangeList: [],
  };

  componentDidMount = async () => {
    const response = await API2.get("stockExchange/list");
    console.log("RESPONESSEES");
    console.log(response);
    this.setState({ exchangeList: response.data });
  };

  renderList = () => {
    console.log(this.state);
    return this.state.exchangeList.map((exchange) => {
      let exchangeList = [];
      // company.compStockMap.forEach((o) =>
      //   exchangeList.push(o.stockExchange.exchangeName)
      // );

      return (
        <div class="row mt-3 p-3 bg-light">
          <div class=" col col-sm-2 m-3">{exchange.exchangeName}</div>
          <div class="col col-sm-2 m-3">{exchange.remarks}</div>
          <div class="col col-sm-3 m-3">{exchange.contactAddress}</div>
          <div class="col col-sm-3 m-3">{exchange.brief}</div>
          <Link
            to={`/admin/exchange/update/${exchange.exchangeName}`}
            class="col col-sm m-3 btn btn-outline-success btn-sm align-self-center"
          >
            Edit
          </Link>
        </div>
      );
    });
    // console.log("Print");
    // console.log(ui);

    return <div>Hello</div>;
  };

  render() {
    console.log(this.renderList());

    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Stock Exchanges List
          </h4>
          <div class="d-flex">
            <Link
              type="button"
              to="/admin/exchange/map"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Map Company To Exchange
            </Link>
            <Link
              type="button"
              to="/admin/exchange/new"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Add New Stock Exchange
            </Link>
          </div>
        </div>
        <div class="mt-3 .bg-light">{this.renderList()}</div>
      </div>
    );
  }
}

export default ListExchanges;
