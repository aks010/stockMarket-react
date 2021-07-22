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
          <div class=" col col-sm-2 m-3">{ipo.pricePerShare}</div>
          <div class="col col-sm-2 m-3">{ipo.totalNumberOfShares}</div>
          <div class="col col-sm-3 m-3">{show}</div>
          <div class="col col-sm-3 m-3">{ipo.remarks}</div>
          <Link
            to={`/admin/ipo/update/${ipo.company.companyName}`}
            class="col col-sm m-3 btn btn-outline-success btn-sm align-self-center"
          >
            Edit
          </Link>
        </div>
      );
    });
    // console.log("Print");
    // console.log(ui);
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

        {/* <div class="container mt-5 d-flex justify-content-between">
          <div>Stock Exchanges</div>

          <div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Filter
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Company Name"
                aria-label="queryCompany"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </div>
        </div> */}

        <div class="mt-3 .bg-light">
          {this.renderList()}
          {/* <div>
            <div class="row mt-3 p-3 bg-light">
              <div class=" col col-sm-3 m-3">Company Name</div>
              <div class="col col-sm-3 m-3">Stock Exchange List </div>
              <div class="col col-sm-4 m-3">Brief</div>
              <button class="col col-sm m-3 btn btn-outline-success btn-sm">
                Edit
              </button>
            </div>
            <div class="row mt-3 p-3 bg-light">
              <div class=" col col-sm-3 m-3">Company Name</div>
              <div class="col col-sm-3 m-3">Stock Exchange List </div>
              <div class="col col-sm-4 m-3">Brief</div>
              <button class="col col-sm m-3 btn btn-outline-success btn-sm">
                Edit
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ListIPOs;
