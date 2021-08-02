export type Color = "BL" | "WH" | "N";
export interface BoardRowProps {
  h: number;
  rowColor: Color[];
  putCell: (h: number, w: number) => void;
}
export interface CellProps {
  h: number;
  w: number;
  color: Color;
  putCell: (h: number, w: number) => void;
}

export const normalRow: Color[] = ["N", "N", "N", "N", "N", "N", "N", "N"];
export const dh = [1, -1, 0];
export const dw = [1, -1, 0];
export const indexes = [...Array(8).keys()];
