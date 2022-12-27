<script lang="ts">
  import type { City, Forecast, TimePeriod } from "../../types";
  import { formatDate } from "../../utils/date";
  import { getWeatherMediaDetailsFrom } from "../../utils/details";
  import ForecastList from "../ForecastList/ForecastList.svelte";
  import SidebarForm from "./SidebarForm.svelte";

  export let isSearching: boolean;
  export let query: string;
  export let place: City;
  export let period: TimePeriod;
  export let hasAccessToGeolocation: boolean | null;
  export let forecast: Forecast[];
  export let cities: City[];
  export let isGettingCurrentLocation: boolean;
  export let onSelectCity: (city: City) => void;
  export let onCurrentLocationClick: () => void;

  $: isMenuVisible = Boolean(query !== "" && cities.length);
</script>

<aside class="sidebar">
  <div>
    <SidebarForm
      {cities}
      isVisible={isMenuVisible}
      {onSelectCity}
      {onCurrentLocationClick}
      {isGettingCurrentLocation}
      bind:query
    />
  </div>

  <div>
    {#if !hasAccessToGeolocation && forecast.length === 0}
      <h2 class="sidebar__title">Start searching your favorite cities 🥵🥶</h2>
    {/if}

    {#if isSearching}
      <h2 class="sidebar__title">
        Searching forecast for {place.name}...
      </h2>
    {/if}

    {#if forecast && place}
      <h2 class="sidebar__title">
        Next {forecast.length} days for {place.name}
      </h2>

      {#each forecast as record}
        {@const media = getWeatherMediaDetailsFrom(record.weathercode, period)}

        <h3 class="sidebar__list-title">
          {formatDate(new Date(record.time), { dateStyle: "full" })}
        </h3>

        <ForecastList {media} forecast={record} />
      {/each}
    {/if}
  </div>
</aside>

<style>
  .sidebar {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    row-gap: 60px;
    height: 100vh;
    overflow: overlay;
    padding: 60px;
    backdrop-filter: blur(30px) brightness(0.7);
  }

  .sidebar__title {
    margin-bottom: 32px;

    font-size: 28px;
  }

  .sidebar__list-title {
    margin-bottom: 8px;
  }

  @media screen and (max-width: 1024px) {
    .sidebar {
      max-height: none;
      height: auto;
      overflow: visible;
      padding: 40px;

      /* backdrop-filter: none; */
    }
  }
</style>
