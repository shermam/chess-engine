import { getAvailablePositions } from "../js/movesLogic.js";
import { recursiveEvaluation } from "./recursiveEvaluation.js";
import { linearEvaluation } from "./linearEvaluation.js";

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 * @param depth {number}
 */
export function getBestMoveWithDepth(position, isWhitesTurn, depth) {
  /** @type {Int8Array | null} */
  let newPosition = null;
  let currentEval = isWhitesTurn ? -Infinity : +Infinity;
  for (const pos of getAvailablePositions(isWhitesTurn, position)) {
    const evaluation = recursiveEvaluation(pos, !isWhitesTurn, depth, 0);
    if (
      (isWhitesTurn && evaluation > currentEval) ||
      (!isWhitesTurn && evaluation < currentEval)
    ) {
      newPosition = pos;
      currentEval = evaluation;
    }
  }

  if (newPosition === null) throw new Error("GAME OVER!");

  return newPosition;
}

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 * @param depth {number}
 */
export function getBestMoveWithDepthLinear(position, isWhitesTurn, depth) {
  /** @type {Int8Array | null} */
  let newPosition = null;
  let currentEval = isWhitesTurn ? -Infinity : +Infinity;
  for (const pos of getAvailablePositions(isWhitesTurn, position)) {
    const evaluation = linearEvaluation(pos, !isWhitesTurn, depth);

    if (
      (isWhitesTurn && evaluation >= currentEval) ||
      (!isWhitesTurn && evaluation <= currentEval)
    ) {
      newPosition = pos;
      currentEval = evaluation;
    }
  }

  if (newPosition === null) throw new Error("GAME OVER!");

  return newPosition;
}
