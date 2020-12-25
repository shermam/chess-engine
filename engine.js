import { getAvailableMoves, getAvailablePositions } from "./movesLogic.js";

/**
 * @param position {Int8Array}
 */
const evaluate = (position) => position.reduce((p, c) => p + c);

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export function getRandomMove(position, isWhitesTurn) {
  const possibleMoves = getAvailableMoves(isWhitesTurn, position);
  const randomMove = (Math.random() * possibleMoves.length) | 0;
  const [from, to] = possibleMoves[randomMove] ?? [0, 0];
  return { from, to };
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
