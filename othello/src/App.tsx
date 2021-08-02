import React, { useState } from "react";
import "./App.css";

type Color = "BL" | "WH" | "N";

// interface Props {
//   h: number;
//   w: number;
//   rowColor?: Color[];
//   putCell?: (h: number, w: number) => void;
//   boardState?: Color[][];
// }

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
  // const seen = color === "N" ? "hidden" : "visible";
  return (
    <>
      <input
        type="button"
        className="btn"
        style={{
          background: cellColor,
          // visibility: seen,
        }}
        onClick={() => {
          putCell(h, w);
        }}
      />
      {/* {h}-{w} */}
    </>
  );
};

const BoardRow: React.FC<BoardRowProps> = (props) => {
  const indexes = [...Array(8).keys()];
  const { h, rowColor, putCell } = props;
  return (
    <>
      {indexes.map((w) => (
        <td key={h * 10 + w}>
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
    setBoardState((prevState) => {
      const newState = [...prevState];
      newState[h][w] = "BL";
      console.log(newState);
      return newState;
    });
    console.log(`${h}-${w} is pushed!`);
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

const App: React.FC = () => (
  <div className="app outer">
    <Board />
  </div>
);

export default App;
