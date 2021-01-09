import { getAvailablePositions } from "../js/movesLogic.js";
import { evaluate } from "./evaluate.js";

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export function getMoveWithBestImmediateEvaluation(position, isWhitesTurn) {
  const possiblePositions = Array.from(
    getAvailablePositions(isWhitesTurn, position)
  );

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
