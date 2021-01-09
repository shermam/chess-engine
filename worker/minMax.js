/**
 * @param evaluations {number[]}
 * @param isWhitesTurn {boolean}
 */
export function minMax(evaluations, isWhitesTurn) {
  const fn = isWhitesTurn ? Math.max : Math.min;
  return fn(...evaluations);
}
