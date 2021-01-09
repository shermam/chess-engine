import { getAvailablePositions } from "../js/movesLogic.js";

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
