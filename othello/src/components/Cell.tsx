import React from "react";
import { CellProps } from "./interfaces";
import decideColor from "../utils/decideColor";

const Cell: React.FC<CellProps> = (props) => {
  const { h, w, color, putCell } = props;
  const cellColor = decideColor(color);
  return (
    <>
      <input
        type="button"
        className="btn"
        style={{
          background: cellColor,
        }}
        onClick={() => {
          putCell(h, w);
        }}
      />
    </>
  );
};

export default Cell;
