import React from "react";

import "./fields.css";


const cells: {cell: number}[] = [{cell: 1 }, {cell: 2 }, {cell: 3 }, {cell: 4 }];

export const Fields = (): any => {
  return cells.map((el: any, i: number) => {
    return <div key={i}  className="cell">{el.cell}</div>
  })
};
