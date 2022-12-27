export enum TimePeriod {
  Day = "day",
  Night = "night",
}

export type WeatherMediaDetails = {
  icon: string;
  description: string;
  images: Record<TimePeriod, string[]>;
};

export type City = {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
};

export type OpenWeather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily_units: DailyUnits;
  daily: Daily;
};

export type CurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
};

export type DailyUnits = {
  time: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
};

export type Daily = {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
};

export type Forecast = {
  time: string;
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
};

export type Location = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
};

export type Address = {
  bridge?: string;
  road?: string;
  suburb?: string;
  borough?: string;
  city?: string;
  town?: string;
  country?: string;
  country_code?: string;
  state?: string;
};

export type Geocoding = {
  results?: GeocodingResult[];
  generationtime_ms: number;
};

export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin3?: string;
  admin4?: string;
  admin2_id?: number;
  admin2?: string;
};

export type LocalWeather = {
  temperature: number;
  city: string;
  time: Date;
  description: string;
  icon: string;
  image: string;
};
