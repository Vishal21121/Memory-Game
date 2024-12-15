import { gameMode } from "./gameMode";

export const getBoardSize = (difficulty: string) => {
  let boardSize;
  switch (difficulty) {
    case gameMode.EASY:
      boardSize = 4;
      break;
    case gameMode.MEDIUM:
      boardSize = 6;
      break;
    case gameMode.HARD:
      boardSize = 8;
      break;
    default:
      boardSize = 4;
      break;
  }
  return boardSize;
};

export const getBoardArray = (boardSize: number) => {
  const numArr = [...Array(boardSize / 2).keys()].map((num) => num + 1);
  const totalNumArr = [...numArr, ...numArr];
  //   Fisher-Yates algorithm is being used to shuffle the elements
  totalNumArr.forEach((_, i, array) => {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });

  const finalArr = totalNumArr.map((el, index) => ({ index, number: el }));
  return finalArr;
};
