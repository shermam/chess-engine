import { getBestMoveWithDepth } from "./getBestMoveWithDepth.js";

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
