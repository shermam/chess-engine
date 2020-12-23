// @ts-check

/**
 * @param handleMove {(param: {from: number, to: number}) => void}
 */
export const createContainer = (handleMove) => {
  const container = document.querySelector("div");

  /** @type {number | undefined} */
  let from;

  container.addEventListener("mousedown", (e) => {
    if (e.target instanceof HTMLDivElement && e.target.hasAttribute("index")) {
      const index = parseInt(e.target.getAttribute("index"));
      from = index;
    }
  });

  container.addEventListener("mouseup", (e) => {
    if (from == null) return;
    if (e.target instanceof HTMLDivElement && e.target.hasAttribute("index")) {
      const to = parseInt(e.target.getAttribute("index"));
      if (from === to) return (from = undefined);

      handleMove({ from, to });

      from = undefined;
    }
  });

  return container;
};
