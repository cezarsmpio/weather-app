import { expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it("formats the date according to the given options", () => {
    const date = new Date("2022-12-26T12:34:56");
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedDate = formatDate(date, options as any);

    expect(formattedDate).toEqual("December 26, 2022, 12:34:56");
  });
});
