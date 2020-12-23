import { initialPosition, EMPTY } from "./board.js";
import { createContainer } from "./container.js";
import { render } from "./renderer.js";

/**
 * @param position {Int8Array}
 */
const evaluate = (position) => position.reduce((p, c) => p + c);

const position = initialPosition;

const container = createContainer(move);

render(position, container);

/**
 * @param param {{from: number, to: number}}
 */
function move({ from, to }) {
  const piece = position[from];
  if (piece == null) return;
  position[to] = piece;
  position[from] = EMPTY;
  render(position, container);
  console.log(evaluate(position) / 3);
}
