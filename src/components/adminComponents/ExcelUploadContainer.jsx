/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React from "react";
import XLSX from "xlsx";
import { EXCEL_MAPPER } from "../../globals/configs";
import API from "../../Api";
import { RenderMessage } from "../../globals/helper";
import { GetAuthHeaderToken } from "../../globals/configs";

export default class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
      parsedData: [],
      displayMessage: false,
      messageUI: null,
      spinner: false,
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }

  clearForm = () => {
    this.setState({
      data: [],
      cols: [],
      parsedData: [],
      displayMessage: false,
      messageUI: null,
      spinner: false,
    });
  };

  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellText: false,
        cellDates: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: false,
        dateNF: "yyyy-mm-dd",
      });
      let columns = [];
      console.log(columns);
      for (let j = 0; j < data[0][j].length; j++) {
        columns.push(EXCEL_MAPPER[data[0][j].trim()]);
      }

      let parsedData = [];

      let cnt = 0;
      for (let i = 1; i < data.length && cnt < 2; i++) {
        let tmp = {};

        if (data[i][0] == null || data[i][1] == null) {
          cnt++;
          continue;
        }
        for (let j = 0; j < columns.length; j++) {
          if (data[i][j] && typeof data[i][j] == "string")
            data[i][j] = data[i][j].trim();
          tmp[columns[j]] = data[i][j];
        }
        parsedData.push(tmp);
      }
      console.log(parsedData);
      console.log(JSON.stringify(data));
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]), parsedData });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  closeDisplayMessage = () => {
    this.clearForm();
    // this.setState({ displayMessage: false,  });
  };

  openDisplayMessage = () => {
    this.setState({ displayMessage: true });
  };

  handleResponse = (response) => {
    console.log(response.data);
    if (response.status == 201 || response.status == 200) {
      const messageUI = RenderMessage(
        201,
        <div>
          Successfully Uploaded Stock Price Data!!
          <br />
          <br />
          SUMMARY
          <ul>
            <li>Company Name: {response.data.companyName}</li>
            <li>Stock Exchange: {response.data.exchangeName}</li>
            <li>Number of Records Imported: {response.data.cntRecords}</li>
          </ul>
        </div>,
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true, spinner: false });
    } else {
      const messageUI = RenderMessage(
        response.status,
        response.data.message,
        this.closeDisplayMessage
      );
      this.setState({ messageUI, displayMessage: true, spinner: false });
    }
  };

  exportFile = async () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    console.log("EXPORTING PARSED DATA");
    console.log(this.state.parsedData);
    this.setState({ spinner: true });
    try {
      const response = await API.post(
        "/stockPrices/uploadExcel/",
        this.state.parsedData,
        {
          headers: {
            Authorization: GetAuthHeaderToken(),
          },
        }
      );

      this.handleResponse(response);
    } catch (e) {
      console.log("Error");
      console.log(e);
      if (e.response) this.handleResponse(e.response);
      else
        this.handleResponse({
          status: null,
          data: { message: "Unable to Connect to Server" },
        });
    }
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    // /* generate XLSX file and send to client */
    // XLSX.writeFile(wb, "sheetjs.xlsx");
  };
  render() {
    // console.log(this.state);
    console.log(this.state);
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
        <div className="row mt-4 mb-3">
          <div className="d-flex col-xs-12 flex-row-reverse">
            {!this.state.spinner ? (
              <button
                disabled={!this.state.data.length}
                className="btn btn-primary col-md-3"
                onClick={this.exportFile}
              >
                Upload Excel
              </button>
            ) : (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {"  "}
                Uploading...
              </button>
            )}
          </div>

          <div class="container mt-5">
            {this.state.displayMessage && this.state.messageUI}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={this.state.data} cols={this.state.cols} />
          </div>
        </div>
      </DragDropFile>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <form className="form-inline" class="mt-5">
        <div className="form-group">
          {/* <label     htmlFor="file">Spreadsheet</label> */}
          <input
            class="mt-3"
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.cols.map((c) => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map((c) => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
