import React from "react";
import ExcelUploadContainer from "./ExcelUploadContainer";

class ImportData extends React.Component {
  render() {
    return (
      <div>
        <h4 style={{ textAlign: "center" }}>
          Upload Stock Price Data Spreadsheet
        </h4>
        <div class="mt-3">
          <ExcelUploadContainer />
        </div>
      </div>
    );
  }
}

export default ImportData;
