import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import API from "../../Api";
import axios from "axios";
import ComparisionForm from "./ComparisionForm";
ReactFC.fcRoot(FusionCharts, TimeSeries);

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
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "700",
        height: "400",
        dataSource,
      },
      data: [],
    };
  }

  componentDidUpdate = (prevProps) => {
    // if (prevProps.data != newProps.data) {
    //   this.setState({ data: newProps.data });
    // }

    if (this.props.data != prevProps.data) {
      console.log("DID UPDATE!!!!!!!!!!s");
      const data = this.props.data;
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
        data: data,
      });
    }
  };

  // loadData = () => {
  //   const data = this.state.data;

  //   console.log(data);
  // };

  render() {
    console.log(this.state.data);
    return (
      <div>
        {/* {this.loadData()} */}
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
