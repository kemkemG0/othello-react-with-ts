/* eslint-disable no-continue */
/* eslint-disable no-constant-condition */
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
  const dh = [1, -1, 0];
  const dw = [1, -1, 0];
  const indexes = [...Array(8).keys()];
  const [boardState, setBoardState] = useState<Color[][]>([
    [...normalRow],
    [...normalRow],
    [...normalRow],
    ["N", "N", "N", "WH", "BL", "N", "N", "N"],
    ["N", "N", "N", "BL", "WH", "N", "N", "N"],
    [...normalRow],
    [...normalRow],
    [...normalRow],
  ]);

  const [turn, setTurn] = useState<Color>("BL");

  const reverseExecution = (
    h: number,
    w: number,
    myturn: Color,
    prevState: Color[][]
  ): { newState: Color[][]; isReversed: boolean } => {
    const newState = [...prevState];
    let isReversed = false;

    // [0]が自分のターン、[1]が相手のターンを指す
    const [me, enemy]: [Color, Color] =
      myturn === "BL" ? ["BL", "WH"] : ["WH", "BL"];

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        let nh = h;
        let nw = w;
        // eslint-disable-next-line no-continue
        if (dh[i] === dw[j] && dh[i] === 0) continue;
        // else {
        let isReversible = false;
        let pre = "N";
        while (1) {
          // 自分が黒の時は 白,白,白,黒 のときのみOK
          nh += dh[i];
          nw += dw[j];

          if (nh >= 8 || nw >= 8 || nh < 0 || nw < 0) break;
          else if (newState[nh][nw] === "N") break;
          else if (newState[nh][nw] === enemy) pre = enemy;
          else if (newState[nh][nw] === me && pre === enemy) {
            isReversible = true;
            break;
          } else break;
        }

        if (isReversible) {
          isReversed = true;
          nh = h;
          nw = w;
          while (1) {
            if (newState[nh][nw] === me) break;
            newState[nh][nw] = me;
            // 初期位置は戻してあげないとバグる
            if (nh === h && nw === w) newState[nh][nw] = "N";
            nh += dh[i];
            nw += dw[j];
          }
        }
      }
    }
    if (isReversed) newState[h][w] = me;

    return { newState, isReversed };
  };

  const reverseCells = (h: number, w: number, prevState: Color[][]) => {
    // インターフェースだけ
    const newState = [...prevState];
    switch (newState[h][w]) {
      case "N":
        return reverseExecution(h, w, turn, newState);
      default:
        return { newState, isReversed: false };
    }
  };

  const putCell = (h: number, w: number): void => {
    // ここで、h,wの色を変えたりする
    // calcCells()的な
    // 下も副作用がないように意識

    setBoardState((prevState) => {
      // ひっくり返す処理を実装
      const { newState, isReversed } = reverseCells(h, w, [...prevState]);
      if (isReversed) {
        setTurn((prevTurn) => {
          if (prevTurn === "WH") return "BL";
          return "WH";
        });
      }
      return newState;
    });
  };

  return (
    <>
      <h3>今のターン{turn}</h3>
      <table className="inner">
        <tbody>
          {indexes.map((h) => (
            <tr key={h}>
              <BoardRow h={h} putCell={putCell} rowColor={boardState[h]} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Board;
