import { describe, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import ForecastList from "./ForecastList.svelte";
import {
  TimePeriod,
  type Forecast,
  type WeatherMediaDetails,
} from "../../types";

describe("ForecastList", () => {
  it("should render forecast list", async () => {
    const forecast: Forecast = {
      sunrise: "2022-01-01T06:00:00.000Z",
      sunset: "2022-01-01T18:00:00.000Z",
      temperature_2m_min: -5,
      temperature_2m_max: 10,
      time: "2022-01-01T18:00:00.000Z",
      weathercode: 3,
    };
    const media: WeatherMediaDetails = {
      description: "Partly cloudy",
      icon: "wi-day-rain",
      images: {
        [TimePeriod.Day]: ["day.jpg"],
        [TimePeriod.Night]: ["night.jpg"],
      },
    };

    render(ForecastList, { forecast, media });

    const sunrise = await screen.findByText("7:00 AM");
    const sunset = await screen.findByText("7:00 PM");
    const min = await screen.findByText("-5 ºC");
    const max = await screen.findByText("10 ºC");
    const description = await screen.findByText("Partly cloudy");
    const icon = await screen.findByTestId("icon-wi-day-rain-22");

    expect(sunrise).toBeVisible();
    expect(sunset).toBeVisible();
    expect(min).toBeVisible();
    expect(max).toBeVisible();
    expect(description).toBeVisible();
    expect(icon).toBeVisible();
  });
});
