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
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 * @param depth {number}
 * @returns {number}}
 */

export function linearEvaluation(position, isWhitesTurn, depth) {
  /** @type {Node|undefined} */
  let currentPos = {
    position,
    isWhitesTurn,
    level: 0,
    evaluation: isWhitesTurn ? -Infinity : +Infinity,
    children: getAvailablePositions(isWhitesTurn, position),
  };

  /** @type {Node[]}*/
  const stack = [];

  let count = 0;

  while (currentPos) {
    if (count++ > 10000000) throw new Error(`too many iterations ${count}`);
    if (currentPos.level < depth) {
      /** @type {IteratorResult<Int8Array>} */
      const child = currentPos.children.next();
      if (!child.done) {
        stack.push(currentPos);
        currentPos = {
          position: child.value,
          isWhitesTurn: !currentPos.isWhitesTurn,
          level: currentPos.level + 1,
          evaluation: !currentPos.isWhitesTurn ? -Infinity : +Infinity,
          children: getAvailablePositions(isWhitesTurn, child.value),
        };
        continue;
      } else {
        const evaluation = currentPos.evaluation;
        currentPos = stack.pop();
        if (!currentPos) return evaluation;
        currentPos.evaluation = minMax(
          [evaluation, currentPos.evaluation],
          currentPos.isWhitesTurn
        );
        continue;
      }
    } else {
      const evaluation = evaluate(currentPos.position);
      currentPos = stack.pop();

      if (!currentPos) throw new Error("Something weird happened here");
      currentPos.evaluation = minMax(
        [evaluation, currentPos.evaluation],
        currentPos.isWhitesTurn
      );
      continue;
    }
  }

  console.log("did not find a move");

  return 0;
}
