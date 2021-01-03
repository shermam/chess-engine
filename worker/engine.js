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
  const possiblePositions = getAvailablePositions(isWhitesTurn, position);
  const evaluated = possiblePositions.map((pos) => ({
    position: pos,
    evaluation: recursiveEvaluation(pos, !isWhitesTurn, depth, 0),
  }));

  if (!evaluated.length) throw new Error("GAME OVER!");

  const newPosition = minMaxPos(evaluated, isWhitesTurn);

  console.log({ count, eval: newPosition.evaluation });

  return newPosition.position;
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
  const possiblePositions = getAvailablePositions(isWhitesTurn, position);

  if (!possiblePositions.length) {
    return evaluate(position);
  }

  if (level < depth) {
    return minMax(
      possiblePositions.map((pos) =>
        recursiveEvaluation(pos, !isWhitesTurn, depth, level + 1)
      ),
      isWhitesTurn
    );
  }

  return minMax(
    possiblePositions.map((pos) => evaluate(pos)),
    isWhitesTurn
  );
}

/**
 * @param evaluations {number[]}
 * @param isWhitesTurn {boolean}
 */
function minMax(evaluations, isWhitesTurn) {
  const fn = isWhitesTurn ? Math.max : Math.min;
  return fn(...evaluations);
}

/**
 * @param evaluations {{evaluation: number, position: Int8Array}[]}
 * @param isWhitesTurn {boolean}
 */
function minMaxPos(evaluations, isWhitesTurn) {
  return evaluations.reduce((prev, curr) => {
    if (isWhitesTurn) {
      if (prev.evaluation > curr.evaluation) {
        return prev;
      }
      return curr;
    } else {
      if (prev.evaluation < curr.evaluation) {
        return prev;
      }
      return curr;
    }
  });
}
