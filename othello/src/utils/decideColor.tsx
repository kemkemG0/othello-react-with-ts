import { Color } from "../components/interfaces";

const decideColor = (color: Color): string => {
  let cellColor;
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
  return cellColor;
};

export default decideColor;
