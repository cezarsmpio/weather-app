import { expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import WeatherDetails from "./WeatherDetails.svelte";

describe("WeatherDetails", () => {
  it("displays the correct temperature, city name, date, weather icon, and description", async () => {
    render(WeatherDetails, {
      temperature: 27,
      name: "London",
      time: new Date("2022-12-26T12:00:00"),
      icon: "wi-day-haze",
      description: "Sunny",
    });

    expect(screen.getByRole("heading", { name: "27 ºC" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "London" })).toBeVisible();
    expect(screen.getByText("December 26, 2022 at 12:00 PM")).toBeVisible();
    expect(screen.getByTestId("icon-wi-day-haze-100")).toBeVisible();
    expect(screen.getByText("Sunny")).toBeVisible();
  });
});
