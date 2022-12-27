<script lang="ts">
  import { onMount } from "svelte";
  import LoadingIcon from "./components/LoadingIcon/LoadingIcon.svelte";
  import Sidebar from "./components/Sidebar/Sidebar.svelte";
  import WeatherDetails from "./components/WeatherDetails/WeatherDetails.svelte";
  import type {
    City,
    Forecast,
    LocalWeather,
    OpenWeather,
    TimePeriod,
  } from "./types";
  import { combine, getRandomItem } from "./utils/array";
  import {
    getAddressFor,
    getCityName,
    getGeocodingFor,
    getWeatherFor,
  } from "./utils/data";
  import { debounce } from "./utils/debounce";
  import { getTimePeriod, getWeatherMediaDetailsFrom } from "./utils/details";
  import { getCurrentPosition } from "./utils/location";
  import { setQueryParams } from "./utils/url";

  let isSearchingForecast = false;
  let query = "";
  let cities: City[] = [];
  let place: City;
  let data: OpenWeather;
  let forecast: Forecast[] = [];
  let time: Date;
  let period: TimePeriod;
  let hasAccessToGeolocation: boolean = null;
  let currentWeather: LocalWeather;
  let isGettingCurrentLocation: boolean = false;

  onMount(async () => {
    const queryParams = new URLSearchParams(window.location.search);
    let latitude = queryParams.get("latitude");
    let longitude = queryParams.get("longitude");

    if (latitude && longitude) {
      const { address } = await getAddressFor(+latitude, +longitude);

      hasAccessToGeolocation = true;

      searchWeatherFor({
        latitude: +latitude,
        longitude: +longitude,
        name: getCityName(address),
      });
    } else {
      setPositionFromCurrent();
    }
  });

  const setPositionFromCurrent = async () => {
    isGettingCurrentLocation = true;

    try {
      const { coords } = await getCurrentPosition();

      const { latitude, longitude } = coords;
      const { address } = await getAddressFor(latitude, longitude);

      hasAccessToGeolocation = true;

      searchWeatherFor({
        latitude,
        longitude,
        name: getCityName(address),
      });
    } catch {
      // TODO: Notify the user

      hasAccessToGeolocation = false;
    } finally {
      isGettingCurrentLocation = false;
    }
  };

  const searchWeatherFor = async (city: City) => {
    try {
      isSearchingForecast = true;
      place = city;
      query = "";
      cities = [];

      data = await getWeatherFor(city);
    } catch {
      // TODO: Notify the user
    } finally {
      isSearchingForecast = false;
    }
  };

  const handleOnChangeQuery = async (query) => {
    if (!query) return;

    try {
      const { results } = await getGeocodingFor(query);

      cities = results ?? [];
    } catch {
      // TODO: Notify the user
    }
  };
  const debouncedHandleOnChangeQuery = debounce(handleOnChangeQuery);

  $: if (data) {
    time = new Date(data.current_weather.time);
    forecast = combine(data.daily);
  }

  $: if (time) {
    period = getTimePeriod(time);
  }

  $: debouncedHandleOnChangeQuery(query);

  $: if (place) {
    setQueryParams({
      latitude: String(place.latitude),
      longitude: String(place.longitude),
    });
  }

  $: if (data && place && period && time) {
    const details = getWeatherMediaDetailsFrom(
      data.current_weather.weathercode,
      period
    );

    currentWeather = {
      city: place.name,
      description: details.description,
      temperature: data.current_weather.temperature,
      time,
      icon: details.icon,
      image: getRandomItem(details.images[period]),
    };
  }
</script>

{#if hasAccessToGeolocation === null}
  <div class="loading">
    <div class="loading__text">
      <LoadingIcon />

      <p>Looking up your position and the weather...</p>
    </div>
  </div>
{/if}

<main class="main">
  {#if currentWeather}
    <div class="background">
      <img
        src={currentWeather.image}
        alt={currentWeather.description}
        class="background__image"
      />
    </div>
  {/if}

  <div class="grid">
    <div>
      {#if currentWeather}
        <WeatherDetails
          name={currentWeather.city}
          time={currentWeather.time}
          description={currentWeather.description}
          icon={currentWeather.icon}
          temperature={currentWeather.temperature}
        />
      {/if}
    </div>

    <div>
      <Sidebar
        {cities}
        {forecast}
        {hasAccessToGeolocation}
        {period}
        {place}
        {isGettingCurrentLocation}
        isSearching={isSearchingForecast}
        onSelectCity={searchWeatherFor}
        onCurrentLocationClick={setPositionFromCurrent}
        bind:query
      />
    </div>
  </div>
</main>

<style>
  .main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--dark);
  }

  .loading__text {
    max-width: 450px;
    padding: 24px;
    margin: 0 16px;

    font-size: 32px;
    color: var(--dark);
    text-align: center;

    background-color: var(--light);
    border-radius: 14px;
  }

  .grid {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    height: 100%;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .background::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 50%;
    z-index: 0;

    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 10%,
      rgba(0, 0, 0, 0) 80%
    );
  }

  .background__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1024px) {
    .main {
      width: auto;
      height: auto;
      overflow: visible;
    }

    .grid {
      display: block;
    }

    .background {
      position: fixed;
    }

    .background::before {
      top: 0;

      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.3) 0,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
  }
</style>
