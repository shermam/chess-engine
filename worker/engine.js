import { getAvailablePositions } from "../js/movesLogic.js";

self.addEventListener("message", (
  /** @type {MessageEvent<{position: Int8Array, isWhitesTurn: boolean}>} */ e
) => {
  const newPosition = getBestMoveWithDepth(
    e.data.position,
    e.data.isWhitesTurn,
    3
  );
  postMessage({ position: newPosition });
});

/**
 * @param position {Int8Array}
 */
const evaluate = (position) => {
  let evaluation = 0;
  for (var i = 0; i < position.length; i++) {
    evaluation += position[i] ?? 0;
  }
  return evaluation;
};

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export function getRandomMove(position, isWhitesTurn) {
  const possiblePositions = Array.from(
    getAvailablePositions(isWhitesTurn, position)
  );
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

// TODO: (@shermam) Remove this count.
// this is here for now just for debug purposes
// I am counting how many times the `recursiveEvaluation`
// function is getting called. And alarmingly with depth 3
// this function is getting called millions of times
let count = 0;

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
  console.log({ count, currentEval });

  return newPosition;
}

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 * @param depth {number}
 * @param level {number}
 * @returns {number}}
 */
export function recursiveEvaluation(position, isWhitesTurn, depth, level) {
  count++;
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

/**
 * @param evaluations {number[]}
 * @param isWhitesTurn {boolean}
 */
function minMax(evaluations, isWhitesTurn) {
  const fn = isWhitesTurn ? Math.max : Math.min;
  return fn(...evaluations);
}
