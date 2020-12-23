// @ts-check

import { initialPosition, EMPTY } from "./board.js";
import { render } from "./renderer.js";

const evaluate = (position) => position.reduce((p, c) => p + c);

let position = initialPosition;

const container = document.querySelector("div");

render(position, container);

/** @type {number | undefined} */
let from;

container.addEventListener("mousedown", (e) => {
  if (e.target instanceof HTMLDivElement && e.target.hasAttribute("index")) {
    const index = parseInt(e.target.getAttribute("index"));
    from = index;
  }
});

container.addEventListener("mouseup", (e) => {
  if (from == null) return;
  if (e.target instanceof HTMLDivElement && e.target.hasAttribute("index")) {
    const to = parseInt(e.target.getAttribute("index"));
    if (from === to) return (from = undefined);

    move({ from, to });

    from = undefined;
  }
});

/**
 * @param param {{from: number, to: number}}
 */
function move({ from, to }) {
  position[to] = position[from];
  position[from] = EMPTY;
  render(position, container);
  console.log(evaluate(position)/3);
}

const evaluation = evaluate(initialPosition);

console.log({
  initialPosition,
  evaluation,
});
