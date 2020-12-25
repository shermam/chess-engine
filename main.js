import { initialPosition, EMPTY } from "./board.js";
import { createContainer } from "./container.js";
import { getAvailableMoves } from "./movesLogic.js";
import { render } from "./renderer.js";

/**
 * @param position {Int8Array}
 */
const evaluate = (position) => position.reduce((p, c) => p + c);

const position = initialPosition;
let isWhitesTurn = true;
let possibleMoves = getAvailableMoves(isWhitesTurn, position);

const container = createContainer(move);

render(position, container);

/**
 * @param param {{from: number, to: number}}
 */
function move({ from, to }) {
  const piece = position[from];
  if (piece == null) return;

  if (!possibleMoves.find(([f, t]) => f === from && t === to)) return;

  isWhitesTurn = !isWhitesTurn;

  position[to] = piece;
  position[from] = EMPTY;
  render(position, container);
  possibleMoves = getAvailableMoves(isWhitesTurn, position);
  console.log(evaluate(position) / 3);

  if (!isWhitesTurn) {
    const randomMove = (Math.random() * possibleMoves.length) | 0;
    const [f, t] = possibleMoves[randomMove] ?? [0, 0];
    move({ from: f, to: t });
  }
}
