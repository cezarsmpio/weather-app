import { render, screen } from "@testing-library/svelte";
import { beforeEach, vi } from "vitest";
import { TimePeriod, type City, type Forecast } from "../../types";
import Sidebar from "./Sidebar.svelte";

const mockOnCurrentLocationClick = vi.fn();
const mockOnSelectCity = vi.fn();

const props = (...params) => ({
  cities: [],
  forecast: [],
  hasAccessToGeolocation: false,
  isGettingCurrentLocation: false,
  isSearching: false,
  onCurrentLocationClick: mockOnCurrentLocationClick,
  onSelectCity: mockOnSelectCity,
  period: TimePeriod.Day,
  place: { latitude: 10, longitude: -10, name: "Berlin" },
  query: "",
  ...params,
});

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show message when access to geolocation is not granted", async () => {
    render(Sidebar, props());

    const text = await screen.findByRole("heading", {
      name: "Start searching your favorite cities 🥵🥶",
    });

    expect(text).toBeVisible();
  });
});
