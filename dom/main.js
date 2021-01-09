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

// // TEMP: (@shermam) Make the computer play itself
// (async function go() {
//   console.time("move");
//   const newPosition = await getComputerMove(position, isWhitesTurn);
//   console.timeEnd("move");
//   position.set(newPosition);
//   refreshScreen();
//   go();
// })();

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
    console.time("move");
    const newPosition = await getComputerMove(position, isWhitesTurn);
    console.timeEnd("move");
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
