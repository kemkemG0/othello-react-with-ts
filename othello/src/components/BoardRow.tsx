import React from "react";
import Cell from "./Cell";
import { BoardRowProps } from "./interfaces";

const BoardRow: React.FC<BoardRowProps> = (props) => {
  const indexes = [...Array(8).keys()];
  const { h, rowColor, putCell } = props;
  return (
    <>
      {indexes.map((w) => (
        <td key={w}>
          <Cell h={h} w={w} color={rowColor[w]} putCell={putCell} />
        </td>
      ))}
    </>
  );
};

export default BoardRow;
