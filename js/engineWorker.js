const worker = new Worker("worker/engine.js", { type: "module" });

/**
 * @param position {Int8Array}
 * @param isWhitesTurn {boolean}
 */
export async function getComputerMove(position, isWhitesTurn) {
  worker.postMessage({ position, isWhitesTurn });

  return new Promise((resolve) => {
    worker.addEventListener("message", (e) => resolve(e.data.position), {
      once: true,
    });
  });
}
