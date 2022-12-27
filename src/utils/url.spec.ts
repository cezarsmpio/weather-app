import { setQueryParams } from "./url";

it("should set the correct query parameters in the URL", () => {
  setQueryParams({ foo: "bar", baz: "qux" });

  expect(location.search).toBe("?foo=bar&baz=qux");
});
