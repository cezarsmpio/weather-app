<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "./components/Icon/Icon.svelte";
  import LoadingIcon from "./components/LoadingIcon/LoadingIcon.svelte";
  import WeatherDetails from "./components/WeatherDetails/WeatherDetails.svelte";
  import type {
    City,
    OpenWeather,
    TimePeriod,
    WeatherMediaDetails,
  } from "./types";
  import { combine, getRandomItem } from "./utils/array";
  import { formatDate } from "./utils/date";
  import { debounce } from "./utils/debounce";
  import { getTimePeriod, getWeatherMediaDetailsFrom } from "./utils/details";

  let isSearchingForecast = false;
  let query = "";
  let cities = [];
  let place: City;
  let data: OpenWeather;
  let details: WeatherMediaDetails;
  let forecast: Record<string, any>[];
  let time: Date;
  let period: TimePeriod;
  let gaveAccessToGeolocation: boolean = null;

  $: if (data) {
    time = new Date(data.current_weather.time);
    forecast = combine(data.daily);
  }

  $: if (time) {
    period = getTimePeriod(time);
  }

  $: if (data && period) {
    details = getWeatherMediaDetailsFrom(
      data.current_weather.weathercode,
      period
    );
  }

  $: isMenuVisible = query !== "" && cities.length;

  onMount(() => {
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        gaveAccessToGeolocation = true;

        const { latitude, longitude } = data.coords;

        const accessToken = "pk.7ad22ed537f71f7cf169ba5a23847c83";
        const res = await fetch(
          `https://eu1.locationiq.com/v1/reverse?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`
        );
        const json = await res.json();

        searchWeatherFor({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          name: json.address.city,
        });
      },
      () => {
        gaveAccessToGeolocation = false;
      }
    );
  });

  const searchWeatherFor = async (city: City) => {
    isSearchingForecast = true;
    place = city;

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
    );
    const json = await res.json();

    data = json;
    query = "";
    cities = [];
    isSearchingForecast = false;
  };

  const handleOnChangeQuery = async () => {
    if (!query) return;

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    );
    const json = await res.json();

    cities = json.results ?? [];
  };
  const debouncedHandleOnChangeQuery = debounce(handleOnChangeQuery);
</script>

{#if gaveAccessToGeolocation === null}
  <div class="loading">
    <div class="loading__text">
      <LoadingIcon />

      <p>Looking up your position and the weather...</p>
    </div>
  </div>
{/if}

{#if data}
  <main class="main">
    <div class="background">
      <img
        src={getRandomItem(details.images[period])}
        alt={details.description}
        class="background__image"
      />
    </div>

    <div class="grid">
      <WeatherDetails
        name={place.name}
        time={data.current_weather.time}
        description={details.description}
        icon={details.icon}
        temperature={data.current_weather.temperature}
      />

      <aside class="sidebar">
        <div>
          <form class="sidebar__form form" on:submit|preventDefault>
            <input
              type="search"
              name="query"
              class="form__input"
              placeholder="Search your city..."
              bind:value={query}
              on:input={debouncedHandleOnChangeQuery}
            />

            {#if isMenuVisible}
              <div class="cities">
                {#each cities as city}
                  <button
                    class="cities__option"
                    type="button"
                    on:click={() => searchWeatherFor(city)}
                  >
                    {#if city.admin1}
                      {city.name}, {city.admin1}, {city.country}
                    {:else}
                      {city.name}, {city.country}
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </form>
        </div>

        <div>
          {#if gaveAccessToGeolocation === false && !forecast}
            <h2 class="sidebar__title">
              Start searching your favorite cities 🥵🥶
            </h2>
          {/if}

          {#if gaveAccessToGeolocation && isSearchingForecast}
            <h2 class="sidebar__title">
              Searching forecast for {place.name}...
            </h2>
          {/if}

          {#if forecast && place}
            <h2 class="sidebar__title">
              Next {forecast.length} days for {place.name}
            </h2>

            {#each forecast as record}
              {@const media = getWeatherMediaDetailsFrom(
                record.weathercode,
                period
              )}

              <h3 class="sidebar__list-title">
                {formatDate(new Date(record.time), { dateStyle: "full" })}
              </h3>

              <dl class="sidebar__list">
                <dt>Sunrise</dt>
                <dd>
                  {formatDate(new Date(record.sunrise), { timeStyle: "short" })}
                </dd>

                <dt>Sunset</dt>
                <dd>
                  {formatDate(new Date(record.sunset), { timeStyle: "short" })}
                </dd>

                <dt>Min</dt>
                <dd>{Math.floor(record.temperature_2m_min)} ºC</dd>

                <dt>Max</dt>
                <dd>{Math.floor(record.temperature_2m_max)} ºC</dd>

                <dt>
                  {media.description}
                </dt>
                <dd>
                  <Icon name={media.icon} size={22} />
                </dd>
              </dl>
            {/each}
          {/if}
        </div>
      </aside>
    </div>
  </main>
{/if}

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
    grid-template-columns: 3fr 1fr;
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

  .sidebar {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    row-gap: 60px;
    max-height: 100%;
    overflow: overlay;
    padding: 60px;
    backdrop-filter: blur(30px) brightness(0.7);
  }

  .sidebar__title {
    margin-bottom: 32px;

    font-size: 28px;
  }

  .sidebar__list {
    display: grid;
    grid-template-columns: 2fr 1fr;
    row-gap: 4px;
  }

  .sidebar__list:not(:last-child) {
    margin-bottom: 32px;
  }

  .sidebar__list :nth-child(even) {
    text-align: right;
  }

  .sidebar__form {
    position: relative;
  }

  .form__input {
    width: 100%;
    padding: 10px 0;

    font-size: 18px;

    background: none;
    border: 0;
    border-bottom: 3px solid var(--light);
    outline: 0;
  }

  .form__input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .cities {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow: overlay;
  }

  .cities__option {
    display: block;
    width: 100%;
    padding: 14px 12px;

    text-align: left;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;

    cursor: pointer;
    border: 0;
    background: var(--light);
  }

  .cities__option:hover {
    background: #efefef;
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

    .sidebar {
      max-height: none;
      overflow: visible;
      padding: 40px;
    }

    .cities {
      max-height: 200px;
    }
  }
</style>
