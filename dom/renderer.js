import { EMPTY } from "../js/board.js";

export const whitePerspective = true;

export const pieceMap = new Map([
  [3, "♟︎"],
  [15, "♜"],
  [9, "♞"],
  [10, "♝"],
  [27, "♛"],
  [126, "♚"],
  [-3, "♟︎"],
  [-15, "♜"],
  [-9, "♞"],
  [-10, "♝"],
  [-27, "♛"],
  [-126, "♚"],
  [0, ""],
]);

/**
 * @param piece {number}
 * @param index {number}
 * @returns {HTMLDivElement}
 */
export const createSquare = (piece, index) => {
  const square = document.createElement("div");
  square.classList.add("square");
  piece && square.classList.add(piece > 0 ? "white" : "black");
  square.setAttribute("index", index.toString());
  square.innerText = pieceMap.get(piece) ?? "";
  return square;
};

/**
 * @param position {Int8Array}
 * @param container {HTMLElement}
 */
export const render = (position, container) => {
  container.firstChild && container.removeChild(container.firstChild);

  const board = document.createElement("div");
  board.classList.add("board");

  if (whitePerspective) {
    for (let index = position.length - 1; index >= 0; index--) {
      board.appendChild(createSquare(position[index] ?? EMPTY, index));
    }
  } else {
    for (let index = 0; index < position.length; index++) {
      board.appendChild(createSquare(position[index] ?? EMPTY, index));
    }
  }

  container.appendChild(board);
};
