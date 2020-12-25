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
  square.classList.add(((index / 8) | 0) % 2 ^ index % 2 ? "dark" : "light");
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

  position.forEach((piece, index) =>
    board.appendChild(createSquare(piece, index))
  );

  container.appendChild(board);
};
