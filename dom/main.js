import { initialPosition } from "../js/board.js";
import { createContainer } from "./container.js";
import { getComputerMove } from "../js/engineWorker.js";
import { generateNewPosition, getAvailableMoves } from "../js/movesLogic.js";
import { render } from "./renderer.js";

const position = initialPosition;
let isWhitesTurn = true;
let possibleMoves = getAvailableMoves(isWhitesTurn, position);

const container = createContainer(move);

render(position, container);

/**
 * @param param {{from: number, to: number}}
 */
async function move({ from, to }) {
  if (!possibleMoves.find(([f, t]) => f === from && t === to)) return;

  position.set(generateNewPosition(position)([from, to]));
  refreshScreen();

  // For now I am forcing the computer to make a move
  // on black's turn
  if (!isWhitesTurn) {
    const newPosition = await getComputerMove(position, isWhitesTurn);
    position.set(newPosition);
    // position.set(getRandomMove(position, isWhitesTurn));
    refreshScreen();
  }
}
function refreshScreen() {
  isWhitesTurn = !isWhitesTurn;
  render(position, container);
  possibleMoves = getAvailableMoves(isWhitesTurn, position);
}