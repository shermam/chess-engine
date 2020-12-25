import { initialPosition } from "./board.js";
import { createContainer } from "./container.js";
import { getMoveWithBestImmediateEvaluation } from "./engine.js";
import { generateNewPosition, getAvailableMoves } from "./movesLogic.js";
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
  if (!possibleMoves.find(([f, t]) => f === from && t === to)) return;

  position.set(generateNewPosition(position)([from, to]));
  refreshScreen();

  // For now I am forcing the computer to make a move
  // on black's turn
  if (!isWhitesTurn) {
    position.set(getMoveWithBestImmediateEvaluation(position, isWhitesTurn));
    refreshScreen();
  }
}
function refreshScreen() {
  isWhitesTurn = !isWhitesTurn;
  render(position, container);
  possibleMoves = getAvailableMoves(isWhitesTurn, position);
}
