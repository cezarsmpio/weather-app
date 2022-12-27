import { vi, it, expect } from "vitest";
import { debounce } from "./debounce";

it("debounce", async () => {
  const callback = vi.fn();

  const debounced = debounce(callback, 100);

  debounced();
  debounced();
  debounced();

  expect(callback).not.toHaveBeenCalled();

  await new Promise((resolve) => setTimeout(resolve, 200));

  expect(callback).toHaveBeenCalled();
});
