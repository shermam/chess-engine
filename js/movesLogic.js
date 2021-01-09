import { EMPTY, p } from "./board.js";

/**
 * @param whitesTurn {boolean}
 * @param position {Int8Array}
 * @returns {[number,number][]}
 */
export function getAvailableMoves(whitesTurn, position) {
  /** @type {[number, number][]} */
  const availableMoves = [];

  for (let i = 0; i < position.length; i++) {
    const piece = position[i];
    if (!piece) continue;
    if (whitesTurn && piece < 0) continue;
    if (!whitesTurn && piece > 0) continue;

    switch (piece) {
      case p.w.PAWN:
      case p.b.PAWN: {
        availableMoves.push(...getPawnMoves(i, position, whitesTurn));
        break;
      }
      case p.w.ROOK:
      case p.b.ROOK: {
        availableMoves.push(...getRookMoves(i, position, whitesTurn));
        break;
      }
      case p.w.KNIGHT:
      case p.b.KNIGHT: {
        availableMoves.push(...getKnightMoves(i, position, whitesTurn));
        break;
      }
      case p.w.BISHOP:
      case p.b.BISHOP: {
        availableMoves.push(...getBishopMoves(i, position, whitesTurn));
        break;
      }
      case p.w.QUEEN:
      case p.b.QUEEN: {
        availableMoves.push(...getQueenMoves(i, position, whitesTurn));
        break;
      }
      case p.w.KING:
      case p.b.KING: {
        availableMoves.push(...getKingMoves(i, position, whitesTurn));
        break;
      }
    }
  }

  return availableMoves;
}

/**
 * @param isWhite {boolean}
 * @param index {number}
 * @param value {number}
 */
const addOrSub = (isWhite, index, value) =>
  isWhite ? index + value : index - value;

/**
 * @param isWhite {boolean}
 * @param dest {number | undefined}
 */
const isEnemy = (isWhite, dest = EMPTY) =>
  isWhite ? dest < EMPTY : dest > EMPTY;

/**
 * TODO: (@shermam) I am not handling en passant yet
 *
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getPawnMoves(index, position, isWhite) {
  /** @type {[number, number][]} */
  const possibleMoves = [];

  const x = index % 8;
  const y = (index / 8) | 0;

  // When the square in front of the pawn is empty...
  if (position[addOrSub(isWhite, index, 8)] === EMPTY) {
    // ... the pawn can move forward one square
    possibleMoves.push([index, addOrSub(isWhite, index, 8)]);

    const originalRow = isWhite ? 1 : 6;

    // and if the pawn is on the original square
    // and the two squares in front it are empty
    // the pawn can move two squares
    if (y === originalRow && position[addOrSub(isWhite, index, 16)] === EMPTY) {
      possibleMoves.push([index, addOrSub(isWhite, index, 16)]);
    }
  }

  // if there is an enemy piece diagonally left of the pawn
  // the pawn can capture it
  if (
    x > 0 &&
    isEnemy(isWhite, position[addOrSub(isWhite, index, isWhite ? 7 : 9)])
  ) {
    possibleMoves.push([index, addOrSub(isWhite, index, isWhite ? 7 : 9)]);
  }

  //  similarly, if there is an enemy piece diagonally right
  // the pawn can also capture it
  if (
    x < 7 &&
    isEnemy(isWhite, position[addOrSub(isWhite, index, isWhite ? 9 : 7)])
  ) {
    possibleMoves.push([index, addOrSub(isWhite, index, isWhite ? 9 : 7)]);
  }

  return possibleMoves;
}

/**
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getRookMoves(index, position, isWhite) {
  /** @type {[number, number][]} */
  const possibleMoves = [];

  const x = index % 8;

  // The rook can move horizontally to the
  // right until its path is blocked by a piece
  for (let i = 1; i < 8 - x; i++) {
    const dest = index + i;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The rook can move horizontally to the
  // left until its path is blocked by a piece
  for (let i = -1; i >= -x; i--) {
    const dest = index + i;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The rook can move vertically up
  // until its path is blocked by a piece
  for (let i = index + 8; i < 64; i += 8) {
    const dest = i;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The rook can move vertically down
  // until its path is blocked by a piece
  for (let i = index - 8; i >= 0; i -= 8) {
    const dest = i;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}

/**
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getBishopMoves(index, position, isWhite) {
  /** @type {[number, number][]} */
  const possibleMoves = [];

  const x = index % 8;

  // The bishop can move diagonally up
  // and to the right
  for (let i = 1, j = 8; i < 8 - x && j < 64 - index; i++, j += 8) {
    const dest = index + i + j;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The bishop can move diagonally up
  // and to the left
  for (let i = -1, j = 8; i >= -x && j < 64 - index; i--, j += 8) {
    const dest = index + i + j;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The bishop can move diagonally down
  // and to the right
  for (let i = 1, j = -8; i < 8 - x && j >= -index; i++, j -= 8) {
    const dest = index + i + j;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  // The bishop can move diagonally down
  // and to the left
  for (let i = -1, j = -8; i >= -x && j >= -index; i--, j -= 8) {
    const dest = index + i + j;
    if (position[dest] === EMPTY) {
      possibleMoves.push([index, dest]);
    } else if (isEnemy(isWhite, position[dest])) {
      possibleMoves.push([index, dest]);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}

/**
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getQueenMoves(index, position, isWhite) {
  // The queen can move like a rook and bishop
  return [
    ...getRookMoves(index, position, isWhite),
    ...getBishopMoves(index, position, isWhite),
  ];
}

/**
 * TODO: (@shermam) I am not handling castle yet
 *
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getKingMoves(index, position, isWhite) {
  /** @type {[number, number][]} */
  const possibleMoves = [];

  const x = index % 8;

  // A King can move one square up
  if (
    index + 8 < 64 &&
    (position[index + 8] === EMPTY || isEnemy(isWhite, position[index + 8]))
  ) {
    possibleMoves.push([index, index + 8]);
  }

  // A King can move one square down
  if (
    index - 8 >= 0 &&
    (position[index - 8] === EMPTY || isEnemy(isWhite, position[index - 8]))
  ) {
    possibleMoves.push([index, index - 8]);
  }

  // A King can move one square to the right
  if (
    x < 7 &&
    (position[index + 1] === EMPTY || isEnemy(isWhite, position[index + 1]))
  ) {
    possibleMoves.push([index, index + 1]);
  }

  // A King can move one square to the left
  if (
    x >= 1 &&
    (position[index - 1] === EMPTY || isEnemy(isWhite, position[index - 1]))
  ) {
    possibleMoves.push([index, index - 1]);
  }

  // A King can move one square diagonally up and right
  if (
    index + 8 < 64 &&
    x < 7 &&
    (position[index + 1 + 8] === EMPTY ||
      isEnemy(isWhite, position[index + 1 + 8]))
  ) {
    possibleMoves.push([index, index + 1 + 8]);
  }

  // A King can move one square diagonally up and left
  if (
    index + 8 < 64 &&
    x >= 1 &&
    (position[index - 1 + 8] === EMPTY ||
      isEnemy(isWhite, position[index - 1 + 8]))
  ) {
    possibleMoves.push([index, index - 1 + 8]);
  }

  // A King can move one square diagonally down and right
  if (
    index - 8 >= 0 &&
    x < 7 &&
    (position[index - 8 + 1] === EMPTY ||
      isEnemy(isWhite, position[index - 8 + 1]))
  ) {
    possibleMoves.push([index, index - 8 + 1]);
  }

  // A King can move one square diagonally down and left
  if (
    index - 8 >= 0 &&
    x >= 1 &&
    (position[index - 8 - 1] === EMPTY ||
      isEnemy(isWhite, position[index - 8 - 1]))
  ) {
    possibleMoves.push([index, index - 8 - 1]);
  }

  return possibleMoves;
}

/**
 * @param index {number}
 * @param position {Int8Array}
 * @param isWhite {boolean}
 * @returns {[number, number][]}
 */
export function getKnightMoves(index, position, isWhite) {
  /** @type {[number, number][]} */
  const possibleMoves = [];

  const x = index % 8;

  // A Knight can move two squares up and one right
  if (
    index + 16 < 64 &&
    x < 7 &&
    (position[index + 16 + 1] === EMPTY ||
      isEnemy(isWhite, position[index + 16 + 1]))
  ) {
    possibleMoves.push([index, index + 16 + 1]);
  }

  // A Knight can move two squares up and one left
  if (
    index + 16 < 64 &&
    x >= 1 &&
    (position[index + 16 - 1] === EMPTY ||
      isEnemy(isWhite, position[index + 16 - 1]))
  ) {
    possibleMoves.push([index, index + 16 - 1]);
  }

  // A Knight can move one square up and two right
  if (
    index + 8 < 64 &&
    x < 6 &&
    (position[index + 8 + 2] === EMPTY ||
      isEnemy(isWhite, position[index + 8 + 2]))
  ) {
    possibleMoves.push([index, index + 8 + 2]);
  }

  // A Knight can move one square up and two left
  if (
    index + 8 < 64 &&
    x >= 2 &&
    (position[index + 8 - 2] === EMPTY ||
      isEnemy(isWhite, position[index + 8 - 2]))
  ) {
    possibleMoves.push([index, index + 8 - 2]);
  }

  // A Knight can move two squares down and one right
  if (
    index - 16 >= 0 &&
    x < 7 &&
    (position[index - 16 + 1] === EMPTY ||
      isEnemy(isWhite, position[index - 16 + 1]))
  ) {
    possibleMoves.push([index, index - 16 + 1]);
  }

  // A Knight can move two squares down and one left
  if (
    index - 16 >= 0 &&
    x >= 1 &&
    (position[index - 16 - 1] === EMPTY ||
      isEnemy(isWhite, position[index - 16 - 1]))
  ) {
    possibleMoves.push([index, index - 16 - 1]);
  }

  // A Knight can move one square down and two right
  if (
    index - 8 >= 0 &&
    x < 6 &&
    (position[index - 8 + 2] === EMPTY ||
      isEnemy(isWhite, position[index - 8 + 2]))
  ) {
    possibleMoves.push([index, index - 8 + 2]);
  }

  // A Knight can move one square down and two left
  if (
    index - 8 >= 0 &&
    x >= 2 &&
    (position[index - 8 - 2] === EMPTY ||
      isEnemy(isWhite, position[index - 8 - 2]))
  ) {
    possibleMoves.push([index, index - 8 - 2]);
  }

  return possibleMoves;
}

/**
 * @param whitesTurn {boolean}
 * @param position {Int8Array}
 * @returns {Int8Array[]}
 */
export function getAvailablePositions(whitesTurn, position) {
  const possibleMoves = getAvailableMoves(whitesTurn, position);
  return possibleMoves.map(generateNewPosition(position));
}

/**
 * @param position {Int8Array}
 * @returns {(param: [number, number]) => Int8Array}
 */
export const generateNewPosition = (position) => ([from, to]) => {
  const newPosition = new Int8Array(position.length);
  newPosition.set(position);
  const piece = newPosition[from];
  if (!piece) throw new Error("No piece found on origin square");

  newPosition[to] = piece;
  newPosition[from] = EMPTY;

  // Handle promotion
  // For now I am always promoting to queen
  // TODO (@shermam) Add a mechanism to allow
  // promotion to other types of pieces
  const y = (to / 8) | 0;
  if (piece === p.w.PAWN && y === 7) {
    newPosition[to] = p.w.QUEEN;
  } else if (piece === p.b.PAWN && y === 0) {
    newPosition[to] = p.b.QUEEN;
  }

  return newPosition;
};
