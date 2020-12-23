// @ts-check

import { initialPosition } from "./board.js";
import { render } from "./renderer.js";

const evaluate = (position) => position.reduce((p, c) => p + c);

const container = document.querySelector("div");

render(initialPosition, container);

container.addEventListener("click", (e) => {
  if (e.target instanceof HTMLDivElement && e.target.hasAttribute("index")) {
    const index = parseInt(e.target.getAttribute("index"));

    console.log(index);
  }
});

const evaluation = evaluate(initialPosition);

console.log({
  initialPosition,
  evaluation,
});
