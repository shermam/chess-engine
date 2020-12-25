import { EMPTY, p } from "./board.js";
import { getAvailableMoves } from "./movesLogic.js";

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
  const possibleMoves = getAvailableMoves(isWhitesTurn, position);
  const evaluated = possibleMoves
    .map(([from, to]) => {
      const newPosition = new Int8Array(position.length);
      newPosition.set(position);

      /** COPIED section. TODO make it reusable */
      const piece = newPosition[from];
      if (!piece) return;
      newPosition[to] = piece;
      newPosition[from] = EMPTY;

      const y = (to / 8) | 0;
      if (piece === p.w.PAWN && y === 7) {
        newPosition[to] = p.w.QUEEN;
      } else if (piece === p.b.PAWN && y === 0) {
        newPosition[to] = p.b.QUEEN;
      }
      /** COPIED section. TODO make it reusable */

      const evaluation = evaluate(newPosition);

      return {
        evaluation,
        from,
        to,
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

  return { from: evaluated.from, to: evaluated.to };
}
