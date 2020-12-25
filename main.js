import { initialPosition, EMPTY, p } from "./board.js";
import { createContainer } from "./container.js";
import { getMoveWithBestImmediateEvaluation, getRandomMove } from "./engine.js";
import { getAvailableMoves } from "./movesLogic.js";
import { render } from "./renderer.js";

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

  // Handle promotion
  // For now I am always promoting to queen
  // TODO (@shermam) Add a mechanism to allow
  // promotion to other types of pieces
  const y = (to / 8) | 0;
  if (piece === p.w.PAWN && y === 7) {
    position[to] = p.w.QUEEN;
  } else if (piece === p.b.PAWN && y === 0) {
    position[to] = p.b.QUEEN;
  }

  render(position, container);
  possibleMoves = getAvailableMoves(isWhitesTurn, position);

  if (!isWhitesTurn) {
    // move(getRandomMove(position, isWhitesTurn));
    move(getMoveWithBestImmediateEvaluation(position, isWhitesTurn));
  }
}
