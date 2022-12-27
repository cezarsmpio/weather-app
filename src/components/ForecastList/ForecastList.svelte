<script lang="ts">
  import type { Forecast, WeatherMediaDetails } from "../../types";
  import { formatDate } from "../../utils/date";
  import Icon from "../Icon/Icon.svelte";

  export let forecast: Forecast;
  export let media: WeatherMediaDetails;

  $: sunrise = formatDate(new Date(forecast.sunrise), { timeStyle: "short" });
  $: sunset = formatDate(new Date(forecast.sunset), { timeStyle: "short" });
  $: min = Math.floor(forecast.temperature_2m_min);
  $: max = Math.floor(forecast.temperature_2m_max);
</script>

<dl class="forecast-list">
  <dt>Sunrise</dt>
  <dd>
    {sunrise}
  </dd>

  <dt>Sunset</dt>
  <dd>
    {sunset}
  </dd>

  <dt>Min</dt>
  <dd>{min} ºC</dd>

  <dt>Max</dt>
  <dd>{max} ºC</dd>

  <dt>
    {media.description}
  </dt>
  <dd>
    <Icon name={media.icon} size={22} />
  </dd>
</dl>

<style>
  .forecast-list {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 14px;
    row-gap: 4px;
  }

  .forecast-list:not(:last-child) {
    margin-bottom: 32px;
  }

  .forecast-list :nth-child(even) {
    text-align: right;
  }
</style>
