import React from "react";
import { Link } from "react-router-dom";
import API from "../../../Api";

class ListExchanges extends React.Component {
  state = {
    sectorList: [],
  };

  componentDidMount = async () => {
    const response = await API.get("/sectors/list");
    console.log("RESPONESSEES");
    console.log(response);
    this.setState({ sectorList: response.data });
  };

  renderList = () => {
    console.log(this.state);
    return this.state.sectorList.map((sector) => {
      let sectorList = [];
      // company.compStockMap.forEach((o) =>
      //   sectorList.push(o.stocksector.sectorName)
      // );

      return (
        <div class="row mt-3 p-3 bg-light">
          <div class=" col col-sm-3 m-3">{sector.sectorName}</div>
          <div class="col col-sm-5 m-3">{sector.brief}</div>
          <Link
            to={`/admin/sector/update/${sector.sectorName}`}
            class="col col-sm-3 m-3 btn btn-outline-success btn-sm align-self-center"
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
    console.log(this.state.sectorList);

    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Sectors List
          </h4>
          <div class="d-flex">
            <Link
              type="button"
              to="/admin/sector/new"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Add New Sector
            </Link>
          </div>
        </div>

        <div class="mt-5 .bg-light">
          <div class="row mt-3 p-3 ">
            <div class=" col col-sm-3 ms-3 me-3">SECTOR NAME</div>
            <div class="col col-sm-5 ms-3 me-3">BRIEF</div>
            <div class="col col-sm-3 ms-3 me-3">ACTION</div>
          </div>

          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default ListExchanges;
