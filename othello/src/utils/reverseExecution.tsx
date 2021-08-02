import { Color, dh, dw } from "../components/interfaces";

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
      for (;;) {
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
        for (;;) {
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

export default reverseExecution;
