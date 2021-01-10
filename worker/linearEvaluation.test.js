import assert from "assert";
import { injectableLinearEvaluation } from "./linearEvaluation.js";

(function uses_minimax_to_get_the_optimal_position_on_a_tree_test() {
  /**
   * Considering the tree below and considering that the root node
   * is the maximizer. The expected result would be 6.
   *           o
   *         /   \
   *       o       o
   *      / \     / \
   *     o   o   o   o
   *    / \ / \ / \ / \
   *    7 3 5 6 0 1 9 2
   */

  const generateChildren = (() => {
    let calls = 0;
    return function* () {
      switch (calls++) {
        case 0:
          yield new Int8Array([0]);
          yield new Int8Array([0]);
          break;
        case 1:
          yield new Int8Array([0]);
          yield new Int8Array([0]);
          break;
        case 2:
          yield new Int8Array([7]);
          yield new Int8Array([3]);
          break;
        case 3:
          yield new Int8Array([5]);
          yield new Int8Array([6]);
          break;
        case 4:
          yield new Int8Array([0]);
          yield new Int8Array([0]);
          break;
        case 5:
          yield new Int8Array([0]);
          yield new Int8Array([1]);
          break;
        case 6:
          yield new Int8Array([9]);
          yield new Int8Array([2]);
          break;
      }
    };
  })();

  const linearEvaluation = injectableLinearEvaluation(generateChildren);
  const result = linearEvaluation(new Int8Array(), true, 3);

  assert.strictEqual(result, 6);
})();
