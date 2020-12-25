import { getAvailablePositions } from "./movesLogic.js";

/**
 * @param position {Int8Array}
 */
const evaluate = (position) => position.reduce((p, c) => p + c);

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export function getRandomMove(position, isWhitesTurn) {
  const possiblePositions = getAvailablePositions(isWhitesTurn, position);
  const randomPosition = (Math.random() * possiblePositions.length) | 0;
  const newPosition = possiblePositions[randomPosition];

  if (!newPosition) throw new Error("Invalid position picked");

  return newPosition;
}

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export function getMoveWithBestImmediateEvaluation(position, isWhitesTurn) {
  const possiblePositions = getAvailablePositions(isWhitesTurn, position);

  if (!possiblePositions.length) throw new Error("GAME OVER");

  const evaluated = possiblePositions
    .map((newPosition) => {
      const evaluation = evaluate(newPosition);
      return {
        evaluation,
        position: newPosition,
      };
    })
    .reduce((prev, curr) => {
      if (!prev || !curr) throw new Error("prev or curr are undefined");
      if (prev.evaluation < curr.evaluation) {
        return prev;
      } else {
        return curr;
      }
    });

  if (!evaluated) throw new Error("evaluated is undefined");

  return evaluated.position;
}
