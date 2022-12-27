import type { City, Geocoding, Location, OpenWeather } from "../types";

export const getAddressFor = async (
  latitude: number,
  longitude: number
): Promise<Location> => {
  const accessToken = import.meta.env.VITE_LOCATION_IQ_ACCESS_TOKEN;
  const res = await fetch(
    `https://eu1.locationiq.com/v1/reverse?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`
  );
  const json = await res.json();

  return json;
};

export const getGeocodingFor = async (query: string): Promise<Geocoding> => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
  );
  const json = await res.json();

  return json;
};

export const getWeatherFor = async (city: City): Promise<OpenWeather> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
  );
  const json = await res.json();

  return json;
};
