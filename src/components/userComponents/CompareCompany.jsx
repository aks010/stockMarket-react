import React from "react";

class CompareCompany extends React.Component {
  render() {
    return (
      <div>
        <div class="d-flex" style={{ justifyContent: "space-between" }}>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Compare Companies
          </h4>
          {/* <div class="d-flex">
            <Link
              type="button"
              to="/admin/exchange/new"
              class="btn btn-outline-success btn-sm ms-3 md-3 "
              style={{ display: "flex", alignItems: "center" }}
            >
              Add New Stock Exchange
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

export default CompareCompany;
