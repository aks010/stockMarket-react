import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import API from "../../Api";
import axios from "axios";
import ComparisionForm from "./ComparisionForm";
ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = (res) => res.json();
const dataFetch = fetch(
  "http://localhost:8081/stockPrices/compare/company"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Sales Analysis",
  },
  subcaption: {
    text: "Grocery & Footwear",
  },
  series: "Type",
  yaxis: [
    {
      plot: "Sales Value",
      title: "Sale Value",
      format: {
        prefix: "$",
      },
    },
  ],
};

class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "700",
        height: "400",
        dataSource,
      },
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  async onFetchData() {
    Promise.all([dataFetch, schemaFetch]);
    const response = await API.post("/stockPrices/compare/company", {
      from: "2001-03-21",
      to: "2095-01-30",
      companyList: ["C"],
      sectorList: [],
    });
    console.log(response);

    const data = response.data;
    // const data = [
    //   ["01-Feb-11", "Grocery", 8866],
    //   ["01-Feb-11", "Footwear", 984],
    //   ["02-Feb-11", "Grocery", 2174],
    //   ["02-Feb-11", "Footwear", 1109],
    //   ["03-Feb-11", "Grocery", 2084],
    //   ["03-Feb-11", "Footwear", 6526],
    //   ["04-Feb-11", "Grocery", 1503],
    //   ["04-Feb-11", "Footwear", 1007],
    // ];
    // const data = [
    //   ["2001-02-11", "A", 2125.3999938964844],
    //   ["2001-03-11", "B", 699.6799926757812],
    //   ["2001-04-11", "A", 3610.30999755859375],
    //   ["2001-04-11", "B", 3186.3899841308594],
    // ];

    console.log(data);
    const schema = [
      {
        name: "Time",
        type: "date",
        format: "%Y-%m-%d",
      },
      {
        name: "Type",
        type: "string",
      },
      {
        name: "Sales Value",
        type: "number",
      },
    ];
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    );
    const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
    console.log(timeseriesDs);
    timeseriesDs.dataSource.data = fusionTable;
    this.setState({
      timeseriesDs,
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

export default ChartViewer;

// import React, { Component } from "react";
// import FusionCharts from "fusioncharts";
// import Charts from "fusioncharts/fusioncharts.charts";
// import ReactFC from "react-fusioncharts";
// import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// let chartConfigs = {
//   type: "column2d", // The chart type
//   width: "700", // Width of the chart
//   height: "400", // Height of the chart
//   dataFormat: "json", // Data type
//   dataSource: {
//     // Chart Configuration
//     chart: {
//       caption: "Stock Price",
//       subCaption: "In MMbbl = One Million barrels",
//       xAxisName: "Company",
//       yAxisName: "SHare Price",
//       numberSuffix: "K",
//       theme: "fusion",
//     },
//     // Chart Data
//     data: [
//       {
//         label: "MAruti",
//         value: "290",
//       },
//       {
//         label: "LG",
//         value: "260",
//       },
//       {
//         label: "Nokia",
//         value: "180",
//       },
//     ],
//   },
// };

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = chartConfigs;
//   }

//   render() {
//     return (
//       <div className="container">
//         <div class="container-fluid">
//           <ReactFC {...chartConfigs} />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
