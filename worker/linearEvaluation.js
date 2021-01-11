import { getAvailablePositions } from "../js/movesLogic.js";
import { evaluate } from "./evaluate.js";
import { minMax } from "./minMax.js";

/**
 * @typedef {{
 *   position: Int8Array,
 *   isWhitesTurn: boolean;
 *   level: number,
 *   evaluation: number,
 *   children: Generator<Int8Array>
 * }} Node
 */

/**
 * @param generateChildren {(whitesTurn: boolean, position: Int8Array) => Generator<Int8Array>}
 * @returns {(position: Int8Array, isWhitesTurn: boolean, depth: number) => number}}
 */
export const injectableLinearEvaluation = (generateChildren) => (
  position,
  isWhitesTurn,
  depth
) => {
  /** @type {Node|undefined} */
  let currentPos = {
    position,
    isWhitesTurn,
    level: 0,
    evaluation: isWhitesTurn ? -Infinity : +Infinity,
    children: generateChildren(isWhitesTurn, position),
  };

  /** @type {Node[]}*/
  const stack = [];

  let count = 0;

  while (currentPos) {
    // This is just to prevent infinite loops for now
    if (count++ > 10_000_000) throw new Error(`too many iterations ${count}`);
    if (currentPos.level < depth) {
      /** @type {IteratorResult<Int8Array>} */
      const child = currentPos.children.next();
      if (!child.done) {
        stack.push(currentPos);
        /** @type {boolean} */
        const turn = !currentPos.isWhitesTurn;

        currentPos = {
          position: child.value,
          isWhitesTurn: turn,
          level: currentPos.level + 1,
          evaluation: turn ? -Infinity : +Infinity,
          children: generateChildren(turn, child.value),
        };
      } else {
        const evaluation = currentPos.evaluation;
        currentPos = stack.pop();
        if (!currentPos) return evaluation;
        currentPos.evaluation = minMax(
          [evaluation, currentPos.evaluation],
          currentPos.isWhitesTurn
        );
      }
    } else {
      const evaluation = evaluate(currentPos.position);
      currentPos = stack.pop();

      if (!currentPos) throw new Error("Something weird happened here");
      currentPos.evaluation = minMax(
        [evaluation, currentPos.evaluation],
        currentPos.isWhitesTurn
      );
    }
  }

  console.log("did not find a move");

  return 0;
};

export const linearEvaluation = injectableLinearEvaluation(
  getAvailablePositions
);
