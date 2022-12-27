import { expect, describe, it } from "vitest";
import { TimePeriod } from "../types";
import { getIcon, getTimePeriod } from "./details";

describe("getTimePeriod", () => {
  it("returns TimePeriod.Day for hours between 6 and 18 (inclusive)", () => {
    for (let i = 6; i < 18; i++) {
      const date = new Date(2022, 0, 1, i);
      const timePeriod = getTimePeriod(date);

      expect(timePeriod).toEqual(TimePeriod.Day);
    }
  });

  it("returns TimePeriod.Night for hours outside of 6 and 18", () => {
    for (let i = 0; i < 6; i++) {
      const date = new Date(2022, 0, 1, i);
      const timePeriod = getTimePeriod(date);

      expect(timePeriod).toEqual(TimePeriod.Night);
    }

    for (let i = 18; i < 24; i++) {
      const date = new Date(2022, 0, 1, i);
      const timePeriod = getTimePeriod(date);

      expect(timePeriod).toEqual(TimePeriod.Night);
    }
  });
});

describe("getIcon", () => {
  it("returns the correct icon for TimePeriod.Day", () => {
    const getDayIcon = getIcon(TimePeriod.Day);
    const icon = getDayIcon("cloudy", "sunny");

    expect(icon).toEqual("wi-day-cloudy");
  });

  it("returns the correct icon for TimePeriod.Night", () => {
    const getNightIcon = getIcon(TimePeriod.Night);
    const icon = getNightIcon("cloudy", "sunny");

    expect(icon).toEqual("wi-night-sunny");
  });
});
