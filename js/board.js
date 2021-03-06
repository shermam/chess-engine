export const EMPTY = 0;
export const p = {
  w: {
    PAWN: 3,
    ROOK: 15,
    KNIGHT: 9,
    BISHOP: 10,
    QUEEN: 27,
    KING: 126,
  },
  b: {
    PAWN: -3,
    ROOK: -15,
    KNIGHT: -9,
    BISHOP: -10,
    QUEEN: -27,
    KING: -126,
  },
};

export const initialPosition = new Int8Array([
  // Row 1
  p.w.ROOK,
  p.w.KNIGHT,
  p.w.BISHOP,
  p.w.QUEEN,
  p.w.KING,
  p.w.BISHOP,
  p.w.KNIGHT,
  p.w.ROOK,

  // Row 2
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,
  p.w.PAWN,

  // Row 3
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,

  // Row 4
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,

  // Row 5
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,

  // Row 6
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,
  EMPTY,

  // Row 7
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,
  p.b.PAWN,

  // Row 8
  p.b.ROOK,
  p.b.KNIGHT,
  p.b.BISHOP,
  p.b.QUEEN,
  p.b.KING,
  p.b.BISHOP,
  p.b.KNIGHT,
  p.b.ROOK,
]);
