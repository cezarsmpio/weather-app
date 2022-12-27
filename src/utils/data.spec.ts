import { getCityName } from "./data";

describe("getCityName", () => {
  it("should return the city name if provided", () => {
    const address = { city: "New York" };
    expect(getCityName(address)).toBe("New York");
  });

  it("should return the town name if provided and city is not provided", () => {
    const address = { town: "Boston" };
    expect(getCityName(address)).toBe("Boston");
  });

  it("should return the village name if provided and city and town are not provided", () => {
    const address = { village: "Chicago" };
    expect(getCityName(address)).toBe("Chicago");
  });

  it("should return the farm name if provided and city, town, and village are not provided", () => {
    const address = { farm: "San Francisco" };
    expect(getCityName(address)).toBe("San Francisco");
  });

  it("should return the county name if provided and city, town, village, and farm are not provided", () => {
    const address = { county: "Los Angeles" };
    expect(getCityName(address)).toBe("Los Angeles");
  });

  it("should return the state name if provided and city, town, village, farm, and county are not provided", () => {
    const address = { state: "Dallas" };
    expect(getCityName(address)).toBe("Dallas");
  });

  it("should return the country name if provided and city, town, village, farm, county, and state are not provided", () => {
    const address = { country: "Houston" };
    expect(getCityName(address)).toBe("Houston");
  });

  it('should return "N/A" if no city, town, village, farm, county, state, or country is provided', () => {
    const address = {};
    expect(getCityName(address)).toBe("N/A");
  });
});
