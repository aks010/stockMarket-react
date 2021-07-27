import React from "react";
import { Link } from "react-router-dom";
import API from "../../Api";

class IPOs extends React.Component {
  state = {
    ipoList: [],
  };

  componentDidMount = async () => {
    const response = await API.get("ipo/list/upcoming");
    console.log(response.data);
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
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Upcoming IPOs
          </h4>
        </div>

        <div class="mt-3 .bg-light">{this.renderList()}</div>
      </div>
    );
  }
}

export default IPOs;
