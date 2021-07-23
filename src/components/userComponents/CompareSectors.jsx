import React from "react";

import ComparisionChart from "./ComparisionChart";

class CompareSectors extends React.Component {
  render() {
    return (
      <div>
        <div class="h4" style={{ display: "flex", alignItems: "center" }}>
          Compare Sectors
        </div>

        <div class="container mt-5">
          {" "}
          <ComparisionChart />
        </div>
      </div>
    );
  }
}

export default CompareSectors;
