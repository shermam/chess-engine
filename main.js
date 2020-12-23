// @ts-check

import { initialPosition, EMPTY } from "./board.js";
import { createContainer } from "./container.js";
import { render } from "./renderer.js";

const evaluate = (position) => position.reduce((p, c) => p + c);

let position = initialPosition;

const container = createContainer(move);

render(position, container);

/**
 * @param param {{from: number, to: number}}
 */
function move({ from, to }) {
  position[to] = position[from];
  position[from] = EMPTY;
  render(position, container);
  console.log(evaluate(position) / 3);
}
