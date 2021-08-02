import { Color } from "../components/interfaces";
import reverseExecution from "./reverseExecution";

const reverseCells = (
  h: number,
  w: number,
  prevState: Color[][],
  turn: Color
): {
  newState: Color[][];
  isReversed: boolean;
} => {
  // インターフェースだけ
  const newState = [...prevState];
  switch (newState[h][w]) {
    case "N":
      return reverseExecution(h, w, turn, newState);
    default:
      return { newState, isReversed: false };
  }
};

export default reverseCells;
