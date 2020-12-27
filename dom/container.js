/**
 * @param handleMove {(param: {from: number, to: number}) => void}
 */
export const createContainer = (handleMove) => {
  const container = document.querySelector("div#container");

  if (container == null || !(container instanceof HTMLDivElement))
    throw new Error("Container must a non null DIV element");

  /** @type {number | undefined} */
  let from;

  container.addEventListener("mousedown", (e) => {
    if (e.target instanceof HTMLDivElement) {
      const indexString = e.target.getAttribute("index");
      if (!indexString) return;
      const index = parseInt(indexString);
      from = index;
    }
  });

  container.addEventListener("mouseup", (e) => {
    if (from == null) return;
    if (e.target instanceof HTMLDivElement) {
      const indexString = e.target.getAttribute("index");
      if (!indexString) return;
      const to = parseInt(indexString);
      if (from === to) {
        from = undefined;
        return;
      }

      handleMove({ from, to });

      from = undefined;
    }
  });

  return container;
};
