import { expect, describe, it } from "vitest";
import { combine, getRandomItem } from "./array";

describe("getRandomItem", () => {
  it("returns a random item from the given array", () => {
    const array = [1, 2, 3, 4, 5];
    const randomItem = getRandomItem(array);

    expect(array).toContain(randomItem);
  });
});

describe("combine", () => {
  it("combines the values of the given object into an array of objects", () => {
    const data = {
      a: [1, 2, 3],
      b: ["a", "b", "c"],
      c: [true, false, true],
    };
    const combined = combine(data);

    expect(combined).toEqual([
      { a: 1, b: "a", c: true },
      { a: 2, b: "b", c: false },
      { a: 3, b: "c", c: true },
    ]);
  });

  it("returns an empty array if the object is empty", () => {
    const data = {};
    const combined = combine(data);

    expect(combined).toEqual([]);
  });
});
