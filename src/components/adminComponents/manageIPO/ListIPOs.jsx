import React from "react";
import { Link } from "react-router-dom";
// import API2 from "../../../Api2";
import API1 from "../../../Api";

class ListIPOs extends React.Component {
  state = {
    ipoList: [],
  };

  componentDidMount = async () => {
    const response = await API1.get("ipo/list");
    console.log("RESPONESSEES");
    console.log(response);
    this.setState({ ipoList: response.data });
  };

  renderList = () => {
    console.log(this.state);

    return this.state.ipoList.map((ipo) => {
      let localDate = new Date(ipo.openDateTime);
      let show = localDate.toLocaleString();
      return (
        <div class="row mt-3 p-3 bg-light">
          <div class="col col-sm-2 m-3">{ipo.pricePerShare}</div>
          <div class="col col-sm-2 m-3">{ipo.totalNumberOfShares}</div>
          <div class="col col-sm-2 m-3">{show}</div>
          <div class="col col-sm-2 m-3">{ipo.remarks}</div>
          <Link
            to={`/admin/ipo/update/${ipo.company.companyName}`}
            class="col col-sm-1.5 m-3 btn btn-outline-success btn-sm align-self-center"
          >
            Edit
          </Link>
          <Link
            to={`/admin/ipo/exchange/${ipo.company.companyName}`}
            class="col col-sm-1.5 m-3 btn btn-outline-success btn-sm align-self-center"
          >
            Add Exchange
          </Link>
        </div>
      );
    });
  };

  render() {
    console.log(this.renderList());

    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>IPO List</h4>
          <div class="d-flex">
            <Link
              type="button"
              to="/admin/ipo/new"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Add New IPO
            </Link>
          </div>
        </div>

        <div class="mt-3 .bg-light">
          <div class="row mt-5 p-3 ">
            <div class="col col-sm-2 ms-3 me-3">PRICE PER SHARE</div>
            <div class="col col-sm-2 ms-3 me-3">TOTAL SHARES</div>
            <div class="col col-sm-2 ms-3 me-3">OPEN DATE TIME</div>
            <div class="col col-sm-2 ms-3 ">REMARKS</div>
            <div class="col col-sm-2.5 text-center">ACTIONS</div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default ListIPOs;
