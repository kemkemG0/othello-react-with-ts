import React, { useState } from "react";
import reverseCells from "../utils/reverseCells";
import BoardRow from "./BoardRow";
import { Color, normalRow, indexes } from "./interfaces";

const Board: React.FC = () => {
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

  const putCell = (h: number, w: number): void => {
    // ここで、h,wの色を変えたりする
    // calcCells()的な
    // 下も副作用がないように意識

    setBoardState((prevState) => {
      // ひっくり返す処理を実装
      const { newState, isReversed } = reverseCells(h, w, [...prevState], turn);
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
    <div>
      <h2>今のターン{turn}</h2>
      <table className="inner">
        <tbody>
          {indexes.map((h) => (
            <tr key={h}>
              <BoardRow h={h} putCell={putCell} rowColor={boardState[h]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
