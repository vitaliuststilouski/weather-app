import React, { Component } from "react";
// import { Fields } from "../fields/fields";
import "./Dashboard.css";

interface Cell {
  cell: number
}

const cells: Array<Cell> = [{cell: 1 }, {cell: 2 }, {cell: 3 }, {cell: 4 }];

export class Dashboard extends Component<any, any> {
  Fields = () => {
      return cells.map((el, i): object => {
        return <div key={i}  className="cell">{el.cell}</div>
      })
  };

  render() {
    return (
      <div className="dashboard">
        <h1 className="title">Weather Forecast</h1>
        <div className="btn-add">
          <button onClick={() => console.log("Modal icon")}>Add City</button>
        </div>
        <div className="fields">
        {this.Fields()}
        </div>
      </div>
    );
  }
}
