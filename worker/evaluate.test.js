import assert from "assert";
import { describe, it } from "../test.js";
import { evaluate } from "./evaluate.js";

describe("evaluate", () => {
  it("returns the sum of all items in the array", () => {
    const result = evaluate(new Int8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    assert.strictEqual(result, 45);
  });

  it("returns 0 for an empty array", () => {
    const result = evaluate(new Int8Array([]));
    assert.strictEqual(result, 0);
  });
});
