import { getAvailablePositions } from "../js/movesLogic.js";
import { evaluate } from "./evaluate.js";
import { minMax } from "./minMax.js";

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 * @param depth {number}
 * @param level {number}
 * @returns {number}}
 */
export function recursiveEvaluation(position, isWhitesTurn, depth, level) {
  let currentEval = isWhitesTurn ? -Infinity : +Infinity;
  if (level < depth) {
    for (const pos of getAvailablePositions(isWhitesTurn, position)) {
      const evaluation = recursiveEvaluation(
        pos,
        !isWhitesTurn,
        depth,
        level + 1
      );
      currentEval = minMax([currentEval, evaluation], isWhitesTurn);
    }
  } else {
    for (const pos of getAvailablePositions(isWhitesTurn, position)) {
      const evaluation = evaluate(pos);
      currentEval = minMax([currentEval, evaluation], isWhitesTurn);
    }
  }

  if (currentEval === -Infinity || currentEval === +Infinity)
    currentEval = evaluate(position);

  return currentEval;
}
