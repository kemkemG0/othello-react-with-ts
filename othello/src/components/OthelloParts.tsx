import React, { useState } from "react";

type Color = "BL" | "WH" | "N";

interface CellProps {
  h: number;
  w: number;
  color: Color;
  putCell: (h: number, w: number) => void;
}

interface BoardRowProps {
  h: number;
  rowColor: Color[];
  putCell: (h: number, w: number) => void;
}

const Cell: React.FC<CellProps> = (props) => {
  const { h, w, color, putCell } = props;
  let cellColor = "N";
  switch (color) {
    case "BL":
      cellColor = "black";
      break;
    case "WH":
      cellColor = "white";
      break;
    default:
      cellColor = "green";
  }
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

const Board: React.FC = () => {
  const normalRow: Color[] = ["N", "N", "N", "N", "N", "N", "N", "N"];
  const indexes = [...Array(8).keys()];
  const [boardState, setBoardState]: [
    Color[][],
    React.Dispatch<React.SetStateAction<Color[][]>>
  ] = useState([
    [...normalRow],
    [...normalRow],
    [...normalRow],
    ["N", "N", "N", "WH", "BL", "N", "N", "N"],
    ["N", "N", "N", "BL", "WH", "N", "N", "N"],
    [...normalRow],
    [...normalRow],
    [...normalRow],
  ]);

  const putCell = (h: number, w: number): void => {
    // ここで、h,wの色を変えたりする
    // calcCells()的な
    // 下も副作用がないように意識
    setBoardState((prevState) => {
      const newState = [...prevState];
      newState[h][w] = "BL";
      return newState;
    });
  };

  return (
    <table className="inner">
      <tbody>
        {indexes.map((h) => (
          <tr key={h}>
            <BoardRow h={h} putCell={putCell} rowColor={boardState[h]} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Board;
